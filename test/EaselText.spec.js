import assert from 'assert';
import Vue from 'vue';
import EaselText from '../resources/assets/js/components/EaselText.vue';
import $ from 'jquery';
import _ from 'lodash';
import easeljs from '../resources/assets/js/easel.js';
import mochaX from './mochaX.js';

describe('EaselText', function () {

    var easel = {
        stage: new easeljs.Stage(document.createElement('canvas')),
    };

    var vm = new Vue({
        template: `
            <span>
                <easel-text ref="text"
                    v-if="showText"
                    :x="1" 
                    :y="2"
                    :text="text"
                    :font="font"
                    :color="color"
                    :align="align"
                    :vertical-align="verticalAlign"
                >
                </easel-text>
            </span>
        `,
        provide() {
            return {
                easel: easel,
            };
        },
        data() {
            return {
                text: 'The Ran in Span Stays Manly On The Plan',
                showText: true,
                font: '20px Arial',
                color: 'black',
                align: 'left',
                verticalAlign: 'top',
            };
        },
        components: {
            'easel-text': EaselText,
        },
    }).$mount();

    var text = vm.$refs.text;

    it('should exist', function () {
        assert(text);
    });

    it('should have component field', function () {
        assert(text.component);
    });

    it('should have the right text', function () {
        assert(vm.text === text.component.text, 'Wrong text: ' + text.component.text);
    });

    it('should be able to change the text', function (done) {
        vm.text = Math.random();
        Vue.nextTick()
            .then(mochaX(() => {
                assert(vm.text === text.component.text, 'Wrong text in: ' + text.component.text);
                done();
            }));
    });

    it('should have the right font', function () {
        assert(vm.font === text.component.font, 'Wrong font: ' + text.component.font);
    });

    it('should be able to change the font', function (done) {
        vm.font = Math.random();
        Vue.nextTick()
            .then(mochaX(() => {
                assert(vm.font === text.component.font, 'Wrong font in: ' + text.component.font);
                done();
            }));
    });

    it('should have the right color', function () {
        assert(vm.color === text.component.color, 'Wrong color: ' + text.component.color);
    });

    it('should be able to change the color', function (done) {
        vm.color = 'grey';
        Vue.nextTick()
            .then(mochaX(() => {
                assert(vm.color === text.component.color, 'Wrong color in: ' + text.component.color);
                done();
            }));
    });

    it('should have the right align', function () {
        assert(vm.align === text.component.textAlign, 'Wrong textAlign: ' + text.component.textAlign);
    });

    it('should be able to change the align', function (done) {
        vm.align = 'center';
        Vue.nextTick()
            .then(mochaX(() => {
                assert(vm.align === text.component.textAlign, 'Wrong textAlign in: ' + text.component.textAlign);
                done();
            }));
    });

    it('should have the right verticalAlign', function () {
        assert(vm.verticalAlign === text.component.textBaseline, 'Wrong textBaseline: ' + text.component.textBaseline);
    });

    it('should be able to change the verticalAlign', function (done) {
        vm.verticalAlign = 'center';
        Vue.nextTick()
            .then(mochaX(() => {
                assert(vm.verticalAlign === text.component.textBaseline, 'Wrong textBaseline in: ' + text.component.textBaseline);
                done();
            }));
    });

    it('should default verticalAlign to alphabetic', function (done) {
        vm.verticalAlign = '';
        Vue.nextTick()
            .then(mochaX(() => {
                assert('alphabetic' === text.component.textBaseline, 'Wrong default textBaseline in: ' + text.component.textBaseline);
                done();
            }));
    });
});
