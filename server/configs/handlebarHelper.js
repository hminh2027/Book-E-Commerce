module.exports = {
    times: function(n, block){
        var accum = '';
        for(var i = 1; i <= n; ++i)
            accum += block.fn(i);
        return accum;
    },

    compare: function(v1, v2, options) {
        if(v1 == v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      },

    json: function(context) {
        return JSON.stringify(context);
    }
}