(function(Vue) {

  var vm = {};
  var util = {};

  util.paginationData = {};

  util.getPaginationData = function(id) {
    if(util.paginationData.hasOwnProperty(id)) {
      return util.paginationData[id];
    }
    return util.paginationData[id] = {
      page: 0,
      pageCount: 0
    };
  };

  vm.grid = Vue.component('grid', {
    replace: true,
    template: require('./template.html'),
    props: ['rows', 'columns', 'filter-key', 'per-page', 'id'],
    data: function() {
      return {
        rows: [],
        columns: [],
        sortColumn: '',
        filterKey: '',
        reversed: {},
        perPage: 10,
        pagination: null
      };
    },
    computed: {
      filteredRows: function() {
        return this.$options.filters.filterBy(this.rows, this.filterKey);
      },
      currentPage: function() {
        if(this.pagination) {
          return this.filteredRows.slice(Math.max(this.pagination.page, 0) * this.perPage, Math.max(this.pagination.page + 1, 1) * this.perPage);
        }
        return [];
      }
    },
    compiled: function() {
      this.$data.pagination = util.getPaginationData(this.id);
      this.$watch(function() {
        this.pagination.pageCount = Math.ceil(this.filteredRows.length / this.perPage);
      });
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

  vm.pagination = Vue.component('pagination', {
    replace: true,
    template: require('./pagination.html'),
    props: ['id'],
    data: function() {
      return {};
    },
    compiled: function() {
      this.$data = util.getPaginationData(this.id);
    },
    methods: {
      isCurrent: function(index) {
        return index === this.page;
      },
      next: function() {
        if(this.page < this.pageCount - 1) {
          this.page++;
        }
      },
      prev: function() {
        if(this.page > 0) {
          this.page--;
        }
      }
    }
  });


})(Vue);
