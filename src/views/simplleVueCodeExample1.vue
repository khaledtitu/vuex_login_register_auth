<template>
    <v-layout row wrap news-form__wrapper>
        <v-flex d-flex justify-center xs2 sm1 pa-2>
            <v-avatar class="mt-2"><img :src="avatarUrl(user)" /></v-avatar>
        </v-flex>
        <v-flex xs10 sm11 pa-2 customcommentarea>
            <div v-if="loading" class="topposttextarea loader">
                <v-progress-circular indeterminate size="60" color="grey" v-show="loading"/>
            </div>
            <textarea
                v-model="text"
                class="commentTextAreaCustom" rows="3"
                placeholder="Votre commentaire"
                @input="inputchanged" @change="inputchanged"
            >
            </textarea>
            <div v-html="iframe"></div>
            <div class="news-form__actions">
                <div class="d-flex">
                    <div class="attach-item">
                        <file-upload
                            class="btn btn--floating btn--small blue attach-item__button"
                            extensions="gif,jpg,jpeg,png,webp"
                            accept="image/png,image/gif,image/jpeg,image/webp"
                            v-model="file"
                            @input-filter="inputFilter"
                            @input-file="inputFile">
                                <v-icon color="white">camera_alt</v-icon>
                        </file-upload>
                        <span class="attach-item__text hidden-xs-only">Photo</span>
                    </div>
                    <div class="attach-item">
                        <v-btn
                            fab small color="blue"
                            class="attach-item__button attach-item__button_gif"
                            @click="showGifBlock = !showGifBlock">
                                <v-icon color="white">gif</v-icon>
                        </v-btn>
                        <span class="attach-item__text hidden-xs-only">Gif</span>
                    </div>
                    <div class="attach-item">
                        <v-btn
                            fab small color="blue"
                            class="attach-item__button"
                            @click.native.stop="smile = !smile">
                                <v-icon color="white">mood</v-icon>
                        </v-btn>
                        <span class="attach-item__text hidden-xs-only">Smiley</span>
                    </div>
                </div>
                <v-btn
                    class="white--text blue news-form__actions-button"
                    :disabled="!(text || current_gif) || loading"
                    @click="createComment()">
                        {{ loading ? '' : 'Envoyer' }}
                        <v-progress-circular indeterminate size="22" color="grey" v-show="loading" />
                </v-btn>
            </div>

            <v-dialog fullscreen transition="dialog-bottom-transition" v-if="$mq.phone" v-model="smile">
                <v-card-actions>
                    <v-btn color="red darken-1" flat @click="hideEmoji()">fermer</v-btn>
                </v-card-actions>
                <v-card>
                    <keep-alive>
                        <picker style="width: 100%; height: 100%" :i18n="smileI18n" v-if="smile" @select="addEmoji" />
                    </keep-alive>
                </v-card>
            </v-dialog>

            <v-dialog v-else v-model="smile" width="353">
                <v-card>
                    <keep-alive>
                        <picker v-if="smile" @select="addEmoji" :i18n="smileI18n"/>
                    </keep-alive>
                </v-card>
            </v-dialog>

            <v-dialog fullscreen transition="dialog-bottom-transition" v-if="$mq.phone" v-model="showGifBlock">
                <v-card-actions>
                    <v-btn color="red darken-1" flat @click="hideGif()">fermer</v-btn>
                </v-card-actions>
                <v-card>
                    <giphy
                        v-if="showGifBlock"
                        :resetGiphy="resetGiphy"
                        :searchGIFs="searchGIFs"
                        :viewGIF="viewGIF"
                        :query="query"
                        :results="results"
                        :current_gif="current_gif"
                        :queryHandler="queryHandler" />
                </v-card>
            </v-dialog>

            <v-dialog v-else v-model="showGifBlock" width="353">
                <v-card style="min-height: 350px">
                    <giphy
                        v-if="showGifBlock"
                        :resetGiphy="resetGiphy"
                        :searchGIFs="searchGIFs"
                        :viewGIF="viewGIF"
                        :query="query"
                        :results="results"
                        :current_gif="current_gif"
                        :queryHandler="queryHandler" />
                </v-card>
            </v-dialog>

            <div class="my-2" v-show="current_gif">
                <img alt="preview" :src="current_gif">
            </div>

            <img
                width="auto"
                height="50"
                alt="preview"
                v-if="file.length && file[0].thumb"
                class="max-width-img my-2"
                :src="file[0].thumb" />
        </v-flex>
    </v-layout>
</template>

<script>

    import giphyMixin from '../../../mixins/giphyMixin';
    import avatarMixin from '../../../mixins/avatarMixin';
    import fileUpload from '../../../mixins/fileUploadMixin';
    import YouTubeMixin from '../../../mixins/YouTubeMixin';

    export default {
        props: {
            user: {
                type: Object,
                required: true
            },
            sendComment: {
                type: Function,
                required: true
            },
            feedId: {
                type: String,
                required: true
            },
            loading: {
                type: Boolean,
                required: true
            }
        },
        mixins: [
            giphyMixin,
            avatarMixin,
            fileUpload,
            YouTubeMixin
        ],
        data () {
            return {
                text: '',
                insertAbleText: '',
                file: [],
                smile: false,
                smileI18n: {
                    search: 'Recherche',
                    categories: {
                        search: 'Résultats de recherche',
                        recent: 'Récents'
                    }
                },
                iframe: null
            }
        },
        methods: {
            addEmoji (emoji) {
                this.text += emoji.native;
                this.smile = false;
            },
            hideEmoji () {
                this.smile = false;
            },
            hideGif () {
                this.showGifBlock = false;
            },
            createComment () {
                this.sendComment({
                    text: this.insertAbleText,
                    id: this.feedId,
                    giphy: this.current_gif,
                    file: this.file.length ? this.file[0] : null
                });
                this.text = '';
                this.insertAbleText = '';
                this.iframe = null;
                this.current_gif = false;
                this.file = [];
            }
        }
    }

</script>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    /deep/ textarea::-webkit-input-placeholder {
        font-size: 14px;
        color: $newstitlenames;
    }

    /deep/ textarea:-moz-placeholder { /* Firefox 18- */
        font-size: 14px;
        color: $newstitlenames;
    }

    /deep/ textarea::-moz-placeholder { /* Firefox 19+ */
        font-size: 14px;
        color: $newstitlenames;
    }

    /deep/ textarea:-ms-input-placeholder {
        font-size: 14px;
        color: $newstitlenames;
    }

    /deep/ textarea::placeholder {
        font-size: 14px;
        color: $newstitlenames;
    }

    .news-form__wrapper {
        padding: 20px;
        @media screen and (max-width: 1903px) {
            padding: 16px;
        }
        @media screen and (max-width: 600px) {
            padding: 8px;
        }
        /deep/ textarea {
            border-style: none !important;
        }
        /deep/ .input-group {
            padding: 8px 0 0;
        }
        /deep/ .input-group--text-field {
            &.input-group--textarea:not(.input-group--full-width) {
                .input-group__input {
                    padding: 0 !important;
                }
            }
        }
    }

    .flex {
        position: relative;
    }

    .topposttextarea {
        width: 100%;
        min-height: 100px;
    }

    .loader {
        text-align: center;
        position: absolute;
    }

    .loader .progress-circular {
        margin-top: 4%;
    }

    .customcommentarea .commentTextAreaCustom {
        border:2px solid rgba(0,0,0,.54) !important;
        width: 100%;
    }

    .news-form__actions {
        display: flex;
        justify-content: space-between;
        .news-form__actions-button {
            @media screen and (max-width: 600px) {
                margin: 0 2px;
            }
        }
        .d-flex {
            @media screen and (max-width: 350px) {
                margin-left: -20px;
            }
        }
    }

    .news-form__file-list {
        display: flex;
        flex-flow: wrap;
        width: 100%;
        li {
            list-style-type: none;
        }
    }

    .attach-item {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        .attach-item__button {
            left: 0 !important;
            top: 0 !important;
            width: 31px;
            height: 31px;
            cursor: pointer;
            @media screen and (max-width: 600px) {
                margin: 0 2px;
            }
        }
        .attach-item__button_gif {
            i.icon {
                font-size: 30px;
            }
        }
    }

    .attach-item__text {
        display: block;
        margin: auto;
        font-size: 12px;
    }

    .giphy-block {
        position: absolute;
        z-index: 99;
        background-color: $light-gray;
        width: 350px;
        padding: 10px;
        max-height: 500px;
        overflow-y: auto;
        .close-box {
            color: $error;
            display: flex;
            flex-direction: column-reverse;
            float: right;
            cursor: pointer;
        }
    }

</style>
