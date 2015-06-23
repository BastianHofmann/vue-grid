(function() {

  function install(Vue) {

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

    Vue.component('grid', {
      replace: true,
      template: [
        '<table class="table">',
          '<thead>',
            '<tr>',
              '<th v-repeat="column: columns" v-on="click:sortBy(column)" v-class="dropup: reversed[column]">',
                '{{column | capitalize}}',
                '<span v-class="caret: sortColumn == column"></span>',
              '</th>',
            '</tr>',
          '</thead>',
          '<tbody>',
            '<tr v-repeat="row: currentPage | orderBy sortColumn reversed[sortColumn]">',
              '<td v-repeat="column: columns">',
                '{{row[column]}}',
              '</td>',
            '</tr>',
          '</tbody>',
        '</table>'
      ].join(''),
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

    Vue.component('pagination', {
      replace: true,
      template: [
        '<nav>',
          '<ul class="pagination">',
            '<li>',
              '<a href="#" aria-label="Previous" v-on="click: prev">',
                '<span aria-hidden="true">&laquo;</span>',
              '</a>',
            '</li>',
            '<li v-repeat="pageCount" v-class="active: isCurrent($index)"><a href="#" v-on="click: this.page = $index">{{$index+1}}</a></li>',
            '<li>',
              '<a href="#" aria-label="Next" v-on="click: next">',
                '<span aria-hidden="true">&raquo;</span>',
              '</a>',
            '</li>',
          '</ul>',
        '</nav>'
      ].join(''),
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
  }

  if (typeof exports == "object") {
    module.exports = install;
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return install });
  } else if (window.Vue) {
    Vue.use(install);
  }

})();
