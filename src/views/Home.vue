<template>
  <div class="wrapper">
    <div class="home">
      <NavBar />
      <div class="home__container scrollbar">
        <div class="home__container__line-left"></div>
        <div class="home__container__content">
          <div class="content__wrapper__title">
            <h4 class="content__title">首頁</h4>
          </div>
          <div class="content__wrapper__tweet">
            <div class="content__tweet">
              <img
                class="content__tweet__img"
                src="https://randomuser.me/api/portraits/lego/2.jpg"
                alt="userImg"
              />
              <textarea
                class="content__tweet__input"
                type="text"
                wrap="hard"
                maxlength="140"
                placeholder="有甚麼新鮮事?"
                @focus="showWarn"
                v-model="tweetText"
              ></textarea>
            </div>
            <div class="content__warn" v-show="warn">{{ warnText }}</div>
            <button class="content__btn" @click="submit">推文</button>
          </div>
          <div class="home__container__content__bottom">
            <!-- <CurrentUserTweets  /> -->
            <HomeTweets
              v-for="tweet in tweets"
              :key="tweet.id"
              :tweet="tweet"
            />
          </div>
        </div>
        <div class="home__container__line-right"></div>
      </div>
      <PopularUser />
    </div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";
import PopularUser from "./../components/PopularUser";
import HomeTweets from "./../components/HomeTweets";
import tweetApis from "../apis/tweet";
import { mapState, mapMutations } from "vuex";


export default {
  data() {
    return {
      show: false,
      warn: false,
      id: -1,
      tweetText: "",
    };
  },
  components: {
    NavBar,
    PopularUser,
    HomeTweets,
  },
  computed: {
    ...mapState(["tweets"]),
    warnText() {
      return !this.tweetText.length ? "內容不可空白" : "字數不可超過140字";
    },
  },
  async created() {
    const { data } = await tweetApis.getTweets();
    this.setTweets(data);
  },
  methods: {
    ...mapMutations(["createTweet", "setTweets"]),
    async submit() {
      await tweetApis.createTweet(this.tweetText);
      const { data } = await tweetApis.getTweets();
      this.setTweets(data);
      this.warn = false;
      this.tweetText = "";
    },
    showWarn() {
      this.warn = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
}
.home {
  height: 100vh;
  display: grid;
  grid-template-columns: 178px auto 273px;
  &__container {
    display: grid;
    grid-template-columns: 1px 1fr 1px;
    margin-right: 5px;
    border-right: 1px solid #e8e8e8;
    padding: 0px 5px 0 20px;
    overflow-y: scroll;

    &__line-left,
    &__line-right {
      width: 1px;
      height: 100%;
      background-color: $line-gray;
    }

    .content {
      &__wrapper {
        &__title {
          height: 72px;
          border-bottom: 1px solid $line-gray;
          padding-left: 25px;
        }
        &__tweet {
          position: relative;
          min-height: 136px;
          border-bottom: 10px solid $line-gray;
          padding-right: 24.69px;
        }
      }
      &__title {
        line-height: 72px;
      }
      &__tweet {
        padding: 16px 24.69px 16px 26.49px;
        display: flex;
        &__img {
          width: 50px;
          height: 50px;
          margin-right: 8px;
          border-radius: 50%;
          object-fit: cover;
        }
        &__input {
          width: 100%;
          border: none;
          background-color: transparent;
          resize: none;
          outline: none;
          display: inline-block;
          @include font(26px, 700, 18px);
          color: $secondary-gray;
        }
      }

      &__warn {
        @include font(15px, 500, 15px);
        position: absolute;
        bottom: 28px;
        right: 101px;
        color: #fc5a5a;
      }

      &__btn {
        @extend %modal-btn;
        position: absolute;
        top: 72px;
        right: 24.69px;
      }
    }
  }
}
.scrollbar {
  &::-webkit-scrollbar {
    width: 15px;
    -webkit-box-shadow: inset 1px 0 0 #e8e8e8;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 7px;
    border: 4px solid transparent;
    background-clip: content-box;
    background-color: #c1c1c1;
  }
}
</style>