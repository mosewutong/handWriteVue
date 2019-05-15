<template>
    <div id="a">
        {{message}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            message:"单页面"
        }
    }
}
</script>

<style lang="less" scoped>
    #a{
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
