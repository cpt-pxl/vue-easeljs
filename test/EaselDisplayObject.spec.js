import assert from 'assert';
import Vue from 'vue';
import EaselSprite from '../src/components/EaselSprite.vue';
import $ from 'jquery';
import _ from 'lodash';
import easeljs from '../src/easel.js';

var garyStart = 32 * 6 + 16;
var eventTypes = ['added', 'click', 'dblclick', 'mousedown', 'mouseout', 'mouseover', 'pressmove', 'pressup', 'removed', 'rollout', 'rollover', 'tick', 'animationend', 'change'];

describe('EaselDisplayObject', function () {

    var eventHandlerCode = eventTypes.map(type => `@${type}="logEvent"`).join(' ');

    var easel = {
        addChild(vueChild) {
            vueChild.added = true;
        },
        removeChild(vueChild) {
            vueChild.removed = true;
        },
    };

    var vm = new Vue({
        template: `
            <span>
                <easel-sprite ref="sprite"
                    v-if="showSprite"
                    :animation="animation"
                    :x="x"
                    :y="y"
                    :flip="flip"
                    :rotation="rotation"
                    :scale="scale"
                    :alpha="alpha"
                    :shadow="shadow"
                    :align="[hAlign, vAlign]"
                    ${eventHandlerCode}
                >
                </easel-sprite>
            </span>
        `,
        provide() {
            return {
                spriteSheet: new easeljs.SpriteSheet({
                    images: ['/base/test/images/lastguardian-all.png'],
                    frames: {width: 32, height: 32},
                    animations: {
                        stand: garyStart + 5,
                        run: [garyStart + 6, garyStart + 7],
                    },
                    framerate: 30,
                }),
                easel: easel,
            };
        },
        data() {
            return {
                animation: 'stand',
                x: 1,
                y: 2,
                eventLog: [],
                showSprite: true,
                flip: '',
                rotation: null,
                scale: 1,
                alpha: null,
                shadow: null,
                hAlign: 'left',
                vAlign: 'top',
            };
        },
        components: {
            'easel-sprite': EaselSprite,
        },
        methods: {
            logEvent(event) {
                this.eventLog.push(event);
            },
            clearEventLog() {
                this.eventLog = [];
            },
        },
    }).$mount();

    var sprite = vm.$refs.sprite;

    it('should exist', function () {
        assert(sprite);
    });

    it('should have same easel', function () {
        assert(sprite.easel === easel);
    });

    it('should have component field', function () {
        assert(sprite.component);
    });

    it('should have been added', function () {
        assert(sprite.added);
    });

    it('should have x and y', function () {
        assert(sprite.component.x === 1);
        assert(sprite.component.y === 2);
    });

    it('should change x and y', function (done) {
        vm.x = 3;
        vm.y = 4;
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.x === 3);
                assert(sprite.component.y === 4);
            })
            .then(done, done);
    });

    _.each(eventTypes, (type) => {
        it(`emits ${type} event`, function () {
            vm.clearEventLog();
            sprite.component.dispatchEvent(type);
            assert(vm.eventLog.length === 1);
        });
    });

    it('should go away when gone', function (done) {
        vm.showSprite = false;
        Vue.nextTick()
            .then(() => {
                assert(sprite.removed);
                vm.showSprite = true;
                return Vue.nextTick();
            })
            .then(() => {
                sprite = vm.$refs.sprite; // make sure others get the new var
            })
            .then(done, done);
    });

    it('should not flip', function (done) {
        vm.flip = '';
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.scaleX === 1);
                assert(sprite.component.scaleY === 1);
            })
            .then(done, done);
    });

    it('should flip horizontal', function (done) {
        vm.flip = 'horizontal';
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.scaleX === -1);
                assert(sprite.component.scaleY === 1);
            })
            .then(done, done);
    });

    it('should flip vertical', function (done) {
        vm.flip = 'vertical';
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.scaleX === 1);
                assert(sprite.component.scaleY === -1);
            })
            .then(done, done);
    });

    it('should flip both', function (done) {
        vm.flip = 'both';
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.scaleX === -1);
                assert(sprite.component.scaleY === -1);
            })
            .then(done, done);
    });

    it('should not rotate', function () {
        assert(!sprite.component.rotation);
    });

    it('should rotate', function (done) {
        vm.rotation = 15;
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.rotation === 15);
            })
            .then(done, done);
    });

    it('should not scale', function (done) {
        vm.flip = '';
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.scaleX === 1);
                assert(sprite.component.scaleY === 1);
            })
            .then(done, done);
    });

    it('should scale to double', function (done) {
        vm.scale = 2;
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.scaleX === 2);
                assert(sprite.component.scaleY === 2);
            })
            .then(done, done);
    });

    it('should scale and flip', function (done) {
        vm.scale = 2;
        vm.flip = "both";
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.scaleX === -2);
                assert(sprite.component.scaleY === -2);
            })
            .then(done, done);
    });

    it('should be 100% opaque', function () {
        assert(sprite.component.alpha === 1, "Wrong alpha: " + sprite.component.alpha);
    });

    it('should become 50% opaque', function (done) {
        vm.alpha = .5;
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.alpha === .5, "Wrong alpha: " + sprite.component.alpha);
            })
            .then(done, done);
    });

    it('should have no shadow', function () {
        assert(sprite.component.shadow === null, "Component: " + sprite.component);
    });

    it('should have shadow', function (done) {
        vm.shadow = ["black", 5, 7, 10];
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.shadow.color === 'black', 'Shadow color: ' + sprite.component.shadow.color);
                assert(sprite.component.shadow.offsetX === 5, 'Shadow offsetX: ' + sprite.component.shadow.offsetX);
                assert(sprite.component.shadow.offsetY === 7, 'Shadow offsetY: ' + sprite.component.shadow.offsetY);
                assert(sprite.component.shadow.blur === 10, 'Shadow blur: ' + sprite.component.shadow.blur);
            })
            .then(done, done);
    });

    it('should have no shadow again', function (done) {
        vm.shadow = null;
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.shadow === null, "Component: " + sprite.component);
            })
            .then(done, done);
    });

    it('should have the right hAlign', function () {
        assert(sprite.component.regX === 0, 'Wrong regX: ' + sprite.component.regX);
    });

    it('should be able to change the hAlign', function (done) {
        vm.hAlign = 'right';
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.regX === 32, 'Wrong regX in: ' + sprite.component.regX);
            })
            .then(done, done);
    });

    it('should default hAlign to left', function (done) {
        vm.hAlign = '';
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.regX === 0, 'Wrong default regX in: ' + sprite.component.regX);
            })
            .then(done, done);
    });

    it('should have the right vAlign', function () {
        assert(sprite.component.regY === 0, 'Wrong regY: ' + sprite.component.regY);
    });

    it('should be able to change the vAlign', function (done) {
        vm.vAlign = 'bottom';
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.regY === 32, 'Wrong regY in: ' + sprite.component.regY);
            })
            .then(done, done);
    });

    it('should default vAlign to top', function (done) {
        vm.vAlign = '';
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.regY === 0, 'Wrong default regY in: ' + sprite.component.regY);
            })
            .then(done, done);
    });

    it('should default to x=0,y=0', function (done) {
        vm.x = undefined;
        vm.y = undefined;
        Vue.nextTick()
            .then(() => {
                assert(sprite.component.x === 0, 'Wrong default x in: ' + sprite.component.x);
                assert(sprite.component.y === 0, 'Wrong default y in: ' + sprite.component.y);
            })
            .then(done, done);
    });
});
