# Vue Grid Component

A vuejs component to render tables.
It obviously still lacks features, but everything should work correctly.

## Install

`npm install vue-grid`

## Usage

``` html
<input type="text" v-model="searchQuery">
<paginaiton id="my-table"></pagination>
<grid id="my-table" rows="{{gridData}}" columns="{{gridColumns}}" filter-key="{{searchQuery}}" per-page="10"></grid>
```

The id property is an identifier, that connects the table to the pagination. So you can actually place your pagination in another area of the site (e.g. some sidebar).

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
