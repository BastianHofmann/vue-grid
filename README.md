# Vue Grid Component

A vuejs component to render tables.

This is a WIP do not use in produciton!

## Usage

``` html
<input type="text" v-model="searchQuery">
<grid rows="{{gridData}}" columns="{{gridColumns}}" filter-key="{{searchQuery}}" per-page="10"></grid>
```

``` javascript
new Vue({
  el: 'body',
  data: function() {
    return {
      searchQuery: '',
      gridColumns: ['name', 'age'],
      gridData: [
        { name: 'Barack Obama', age: 53 },
        { name: 'Some Dude', age: 24 },
        { name: 'Another Dude', age: 34 }
        // ...
      ]
    };
  }
});
```
