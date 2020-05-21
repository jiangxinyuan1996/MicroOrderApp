<template>
    <div class="delivery">
        <div class="weui_padding f-sub-mb">
            <div class="f-flex f-sub-mr">
                <div class="f-flex f-vc weui_cells_checkbox">
                    <div>
                        <input class="weui_check" type="checkbox" readonly="" checked="">
                        <div class="f-flex f-vc">
                            <img src="data:image/png;base64,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" style="width: 23px; height: 23px; user-select: none;">
                        </div>
                    </div>
                </div>
                <div class="f-flex-1">
                    <div class="f-flex f-vc f-sub-mr g8">
                        <div>
                            <div class="avatar img-rounded" style="width: 72px; height: 72px;">
                                <img class="img-rounded" src="https://xcimg.szwego.com/o_1e8oc0l1i1mmv3cl1sla2nr13ab16.jpg?imageMogr2/auto-orient/thumbnail/!310x310r/quality/100/format/jpg"></div></div><div class="f-flex-1">
                                    <div class="word-break ellipsis-two" style="-webkit-line-clamp: 1;">花</div>
                                    <div class="word-break ellipsis-one " style="margin-top: 8px; white-space: nowrap;">货号：1106</div>
                            </div>
                            <div class="text-right">
                                <div class="warn-color">¥ 12</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="f-sub-mb">
                    <div class="f-flex f-sub-mr">
                        <div class="f-flex f-vc weui_cells_checkbox">
                            <div>
                                <input class="weui_check" type="checkbox" readonly="" checked="">
                                <!-- <div class="f-flex f-vc">
                                    <img src="data:image/png;base64,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" style="width: 23px; height: 23px; user-select: none;">
                                </div> -->
                                <i class="weui_icon_checked"></i>
                            </div>
                        </div>
                        <div class="f-flex-1">
                            <div>
                                <div class="g3">
                                    <div class="f-flex f-vc f-sub-mr">
                                        <div class="f-flex-1">
                                            <div class="word-break ellipsis-two" style="-webkit-line-clamp: 1;">默认</div>
                                        </div>
                                        <div class="f-flex-1">
                                            <div class="f-flex f-vc" style="border: 1px solid rgb(187, 187, 187); border-radius: 5px;">
                                                <i style="padding: 0px 1em; font-style: normal; user-select: none; opacity: 1;">-</i>
                                                <input class="weui_input text-center" autocomplete="off" id="default" type="tel" pattern="[0-9]*" value="4" style="border-radius: 0px; border-width: 0px 1px; border-style: solid; border-color: rgb(187, 187, 187);">
                                                <i style="padding: 0px 1em; font-style: normal; user-select: none; opacity: 0.2;">+</i>
                                            </div>
                                        </div>
                                    </div>
                                <div class="f-flex f-vt f-sub-mr f12">
                                    <div class="f-flex-1 f-flex f-vc f-sub-mr f-flex-wrap"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.weui_padding {
    padding: 10px 15px;
}
.f-sub-mb>:not(:last-child) {
    margin-bottom: .8em;
}
.f-flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.f-sub-mr>:not(:last-child) {
    margin-right: .8em;
}
.f-vc {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-align: center;
}
.f-flex-1 {
    -webkit-box-flex: 1;
    width: 0;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.text-right {
    text-align: right;
}
.warn-color {
    color: #ffbe00;
}
.word-break {
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
}
.ellipsis-two {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-align: left;
    -webkit-line-clamp: 2;
}
.ellipsis-one {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
}
.f-flex-wrap {
    -webkit-box-lines: multiple;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
.img-rounded {
    border-radius: 6px;
}
.avatar {
    margin: 0 auto;
}
.avatar, .thumbnail {
    display: block;
    position: relative;
    width: 60px;
    height: 60px;
}
.avatar a>img, .avatar>img, .thumbnail a>img, .thumbnail>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-user-select: none;
    user-select: none;
}
.g3 {
    color: #333;
}
.deep-gray, .g8{
    color:#888;
}
.weui_check {
    position: absolute;
    left: -9999em;
}
.weui_input {
    width: 100%;
    border: 0;
    border-radius: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    height: 1.41176471em;
    line-height: 1.41176471;
}
.text-center {
    text-align: center;
}
.weui_cells_checkbox .weui_icon_checked:before {
    content: '\EA01';
    color: #c9c9c9;
    font-size: 23px;
    display: block;
}
[class*=" weui_icon_"]:before, [class^=weui_icon_]:before {
    margin: 0;
}
[class*=" weui_icon_"]:before, [class^=weui_icon_]:before {
    font-family: weui;
    font-style: normal;
    font-weight: 400;
    display: inline-block;
    vertical-align: middle;
    text-decoration: inherit;
    width: 1em;
    margin-right: .2em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: .2em;
}
</style>