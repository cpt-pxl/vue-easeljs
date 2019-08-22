export default {
    props: ['cache'],
    data() {
        return {
            cacheStarted: false,
            cacheNeedsUpdate: false,
        };
    },
    watch: {
        cache() {
            if (this.cache) {
                this.cacheInit();
            } else {
                this.cacheDestroy();
            }
        },
        cacheNeedsUpdate() {
            if (this.cacheNeedsUpdate) {
                if (this.cache) {
                    this.$nextTick(() => {
                        if (this.component && this.component.cacheCanvas) {
                            this.component.updateCache();
                        }
                        this.setEaselCacheNeedsUpdate();
                    });
                } else {
                    this.setEaselCacheNeedsUpdate();
                }
            }
        },
    },
    methods: {
        cacheInit() {
            if (this.cache) {
                this.getBounds()
                    .then(rectangle => {
                        this.component.cache(this.x, this.y, rectangle.width, rectangle.height);
                        this.cacheStarted = true;
                        this.cacheNeedsUpdate = false;
                    });
            }
        },
        cacheDestroy() {
            this.component.uncache();
            this.cacheStarted = false;
            this.cacheNeedsUpdate = false;
        },
        setEaselCacheNeedsUpdate() {
            if (this.easel && 'cacheNeedsUpdate' in this.easel) {
                this.easel.cacheNeedsUpdate = true;
            }
        },
    },
};