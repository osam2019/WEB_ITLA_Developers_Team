<template>
    <div id = "reader_wrapper"  style = "background: white; padding: 1px">
        <div>
            <div id = "title" style="font-size: 35px; text-align: center; display: inline">
                {{props.title}}
                <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click">
                    <div id="star" style="display: inline-flex; text-align: center"   >
                        <el-rate v-model="props.rate" allow-half class="rate_area"></el-rate>
                        <el-button @click.stop="clear" > O</el-button>
                    </div>
                    <i v-bind:class="[star_class, props.rate ? 'el-icon-star-on':'el-icon-star-off']" slot="reference" @mouseover="on" @mouseleave= "off"></i>
                </el-popover>

            </div>
        </div>

        <div style="clear: both"></div>
        <iframe v-bind:src="props.url" style="width:98%; height: 88%; margin:auto; overflow:hidden;"></iframe>
    </div>
</template>

<script>
    export default {
        name: "Feedreader",
        props: ['props'],
        data() {
            return {
                star_class :  "el-icon-star-off"
            }
        },
        methods:{
            on(){
                this.$data.star_class = "el-icon-star-on";
            },
            off(){
                this.$data.star_class = "el-icon-star-off";
            },
            clear(){
                this.props.rate = 0;
            }
        },

    }
</script>

<style scoped>
    #title{

    }
</style>