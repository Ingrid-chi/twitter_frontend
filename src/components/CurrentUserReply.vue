<template>
  <div class="currentUserReply-wrapper">
    <div 
    class="reply-container-for"
    v-for="reply in replies"
    :key="reply.id"
    >
    <div class="reply-container">
      <div class="reply-container__avatar">
        <img :src="reply.Tweet.User.avatar" alt="" />
      </div>

      <div class="reply-container__detail">
        <!-- title -->
        <div class="reply-container__detail__title">
          <label class="reply-container__detail__title__name primary-bold"
            >{{ reply.User.name }}</label
          >
          <label class="reply-container__detail__title__account"
            >{{ "@" + reply.User.account }}．</label
          >
          <label class="reply-container__detail__title__created-at"
            >{{ reply.createdAt | fromNow }}
          </label>
        </div>

        <!-- reply-user -->
        <div class="reply-container__detail__user">
          <label class="reply-container__detail__user__title">回復</label>
          <label class="reply-container__detail__user__account">{{ "@" + reply.Tweet.User.account }}</label>
        </div>

        <!-- description -->
        <p class="reply-container__detail__description">
          {{ reply.Tweet.description }}
        </p>
      </div>
    </div>

    <div class="currentUserReply-wrapper__bottom"></div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "CurrentUserReply",

  mixins: [fromNowFilter],

  components: {},

  data() {
    return {
      replies: [],
    };
  },

  created() {
    this.fetchCurrentUserReplied(this.$route.params.userId);
  },

  methods: {
    async fetchCurrentUserReplied() {
      try {
        const response = await usersAPI.getUserReplied(this.$route.params.userId);
        this.replies = response.replies;
      } catch (error) {
        const { response } = error;
        if (response.data.message) {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      }
    },
  },

  computed: {
    ...mapState(["currentUser"]),
  },

  watch: {
    '$route.params.userId': async function () {
      this.fetchCurrentUserReplied(this.$route.params.userId);
    },
  },
};
</script>

<style lang="scss" scoped>
.currentUserReply-wrapper {
  &__bottom {
    @extend %line-bottom;
  }
}

.reply-container {
  display: flex;
  flex-direction: row;
  padding: 16px 24px;
  &__avatar {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  &__detail {
    padding-left: 8px;
    &__title {
      padding-bottom: 8px;
      &__name {
        @extend %primary-p;
        color: $main-black;
        padding-right: 8px;
      }
      &__account,
      &__created-at {
        @extend %secondary-p;
        color: $secondary-gray;
      }
    }

    &__user {
      padding: 8px 0;
      &__title {
        @extend %secondary-p;
        color: $secondary-gray;
        line-height: 22px;
        padding-right: 8px;
      }
      &__account {
        @extend %secondary-p;
        color: $main-orange;
        line-height: 22px;
      }
    }

    &__description {
      @extend %secondary-p;
      color: $main-black;
      line-height: 26px;
      padding-bottom: 8px;
    }
  }
}
</style>