module.exports = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'liveblocks.io',
            port: ''
        }
    ]
   },
    webpack: (config, { isServer }) => {
      // Add a rule to handle binary files
      config.module.rules.push({
        test: /\.(woff2?|ttf|eot|otf|png|svg|gif|jpg|jpeg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
      });
  
      // If the canvas.node file is only used on the server-side, exclude it from the client-side bundle
      if (isServer) {
        config.externals.push(
          // Add any other modules that should be externalized
          (context, request, callback) => {
            if (/canvas\.node$/i.test(request)) {
              return callback(null, `commonjs ${request}`);
            }
            callback();
          }
        );
      }
  
      return config;
    },
    typescript:{
      ignoreBuildErrors: true
    }
  };
  