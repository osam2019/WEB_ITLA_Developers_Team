<template>
    <el-main class="home">
        <main>
            <div class="feedranking">
                <feed-ranking></feed-ranking>
            </div>
        </main>
    </el-main>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '../components/HelloWorld'
    import FeedRanking from '../components/FeedRanking'

    let APP_LOG_LIFECYCLE_EVENTS = false;

    export default {
        name: 'home',
        data() {
            return {

            }
        },
        components: {
            FeedRanking
        },

        beforeCreate: function () {
            if (APP_LOG_LIFECYCLE_EVENTS) {
                console.log("beforeCreate");
            }
        }
    }
</script>

<style scoped>
  .feedranking {
    padding : 1%;
  }
    .home{
        margin:1%;
    }
</style>