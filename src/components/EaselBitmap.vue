<script>
import easeljs from '../../easeljs/easel.js';
import EaselDisplayObject from '../mixins/EaselDisplayObject.js';
import getDimensionsFromGetBounds from '../libs/get-dimensions-from-get-bounds.js';
import EaselAlign from '../mixins/EaselAlign.js';
import EaselCache from '../mixins/EaselCache.js';
import EaselFilter from '../mixins/EaselFilter.js';

export default {
    props: ['image'],
    updatesEaselCache: ['component', 'scale'],
    mixins: [EaselDisplayObject, EaselAlign, EaselCache, EaselFilter],
    render() {
        return '<!-- bitmap -->';
    },
    watch: {
        image() {
            this.component = new easeljs.Bitmap(this.image);
        },
    },
    mounted() {
        this.component = new easeljs.Bitmap(this.image);
    },
    methods: {
        getAlignDimensions() {
            return getDimensionsFromGetBounds(this);
        },
        getCacheBounds() {
            return this.updateAlign()
                .then(({width, height}) => {
                    return {
                        x: 0,
                        y: 0,
                        width,
                        height,
                    };
                });
        },
    },
};
</script>
