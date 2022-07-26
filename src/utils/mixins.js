import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(dateTime) {
      moment.locale('zh-tw');
      return dateTime ? moment(dateTime).fromNow() : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}