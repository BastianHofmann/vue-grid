Vue.component('grid', {
  replace: true,
  template: require('./template.html'),
  props: ['rows', 'columns', 'filter-key', 'per-page'],
  data: function() {
    return {
      rows: null,
      columns: null,
      sortColumn: '',
      filterKey: '',
      reversed: {},
      perPage: 10,
      rawPage: 0
    };
  },
  computed: {
    pageCount: function() {
      return Math.ceil(this.$eval('rows | filterBy filterKey').length / this.perPage);
    },
    currentPage: function() {
      return this.$eval('rows | filterBy filterKey').slice(Math.max(this.page, 0) * this.perPage, Math.max(this.page + 1, 1) * this.perPage);
    },
    page: {
      get: function() {
        return this.rawPage;
      },
      set: function(val) {
        if(val < 0) {
          this.rawPage = this.pageCount - 1;
        } else if(val > this.pageCount) {
          this.rawPage = 1;
        } else {
          this.rawPage = val;
        }
      }
    }
  },
  compiled: function() {
    var self = this;
    this.columns.forEach(function(column) {
      self.reversed.$add(column, false);
    })
  },
  methods: {
    sortBy: function(column) {
      this.sortColumn = column;
      this.reversed[column] = ! this.reversed[column];
    }
  }
});
