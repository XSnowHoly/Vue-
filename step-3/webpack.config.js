module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {  
                test: /\.css$/,  
                use: ['style-loader', 'css-loader']  
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                      'url-loader?limit=10000',
                      'img-loader'
                ]
            }
        ]
  },
  resolve: {
    alias: {
        'vue$': 'vue/dist/vue.common.js'
    }
  }
}