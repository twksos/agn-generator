// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    "pluginOptions": {
        "electronBuilder": {
            "preload": {
                "preload": "src/preload.js",
                "acfun-preload": "src/acfun-preload.js"
            },
            "builderOptions": {
                appId: "com.twksos.agn-generator",
                productName: 'AGN生成器',
                "win": {
                    "icon": "./public/icon-310x310.png",
                    "signAndEditExecutable": false,
                    "target": [
                        "portable"
                    ]
                },
                "mac": {
                    "icon": "./public/icon.icns", 
                    "category": "public.app-category.utilities"
                  },
            }
        }
    }
}