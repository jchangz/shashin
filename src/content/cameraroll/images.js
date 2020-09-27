export const camerarollroutes = [
    { url: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=1200', class: "cr-kyoto", title: 'Camera Roll', subtitle: 'Kyoto', click: 'camerarollkyoto', blur: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=1200&blur=100' },
    { url: 'https://shashin.imgix.net/miyajima.jpg?w=828', class: "cr-japan", title: 'Camera Roll', subtitle: 'Japan', click: 'camerarolljapan', blur: 'https://shashin.imgix.net/miyajima.jpg?w=828&blur=100' },
    { url: 'https://live.staticflickr.com/65535/48034089942_ebef0ec498_c.jpg', class: "cr-asia", title: 'Camera Roll', subtitle: 'Asia', click: 'asia', blur: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=1200&fm=webp&blur=100' },
    { url: 'https://live.staticflickr.com/65535/48155183631_c48bd3c918_b.jpg', class: "cr-random", title: 'Camera Roll', subtitle: 'Random', click: 'random', blur: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=1200&fm=webp&blur=100' }
]

export const camerarollcontent = [
    {
        name: 'camerarollkyoto',
        images: [
            {
                url: 'https://live.staticflickr.com/65535/48033978696_a43b508826_w.jpg',
                thumbnail: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=100&fm=webp&blur=50'
            },
            {
                url: 'https://live.staticflickr.com/65535/48033978851_046672dac7_w.jpg',
                thumbnail: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=100&fm=webp&blur=50'
            },
            {
                url: 'https://live.staticflickr.com/65535/50318478832_9ae414b1c8_o.jpg',
                thumbnail: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=100&fm=webp&blur=50'
            },
            {
                url: 'https://live.staticflickr.com/65535/48034090387_d62885f35e_c.jpg',
                thumbnail: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=100&fm=webp&blur=50'
            },
            {
                url: 'https://live.staticflickr.com/65535/48034089612_d49c757b5b_c.jpg',
                thumbnail: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=100&fm=webp&blur=50'
            },
            {
                url: 'https://live.staticflickr.com/65535/48033978976_b9daa1d388_w.jpg',
                thumbnail: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=100&fm=webp&blur=50'
            },
            {
                url: 'https://live.staticflickr.com/65535/48033978696_a43b508826_w.jpg',
                thumbnail: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=100&fm=webp&blur=50'
            },
            {
                url: 'https://live.staticflickr.com/65535/48033978851_046672dac7_w.jpg',
                thumbnail: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=100&fm=webp&blur=50'
            },
            {
                url: 'https://live.staticflickr.com/65535/48033978976_b9daa1d388_w.jpg',
                thumbnail: 'https://individual99.imgix.net/IMG_3265-desktop.jpg?w=100&fm=webp&blur=50'
            }
        ]
    },
    {
        name: 'camerarolljapan',
        images: [
            { url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg' },
            { url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg' },
            { url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg' },
            { url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg' },
            { url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg' },
            { url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg' },
            { url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg' },
            { url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg' },
            { url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg' },
        ]
    }
]

export const iconclose = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAB3UlEQVRoQ+3Z/TFFMRAF8PMqoAQlKIEO6EAHdKQEOkAHdKAEOjA7czMTTyY3mz3ZK/etvyM3v5yVLwec2M/hxLwI8N4Tj4Qj4Z3NQJT0zgL9w4mEI+GdzUCU9M4CjUUrStpQ0ncA7gFcA/gy9JP/6iWAJwC3AN4ZfbISFuzjMiAZGAMt2BcA58sESp9mNAOcY1MIVnSOTX1K1ZjRVrDM/ieAs0K59aJL2NT9G4ArS2lbwfJtGeArCV3DfixY0/rAALPQw7EyUBbYinbBssG9aDfsCLAW7YodBW5FX2T77PHCS1mgSqs582/4uP+11VvAsq25YUcmnBA1dCmAYcmmj41MWIsejvVIuBXtgvUGp4tAqZR7j6HqU6ZXSdewrAtHE340uLbPbpL0SPDaoUK2JeYta9OE17ByxRMw65bVhB21aLVg0xVv7XDCeDn5NRnsktZgW7Ys+urNBPdg3dEssAXrimaAGVg3tBVce8TrPS7WFrJ/8YhXeqbtxdaS/l4e8Uxv09aE0wBztBVbQlOw7H1Y0A+Mp9Rs45TyfgZww/ivAxvcfNrZsiGrpLc0qL4dYNV0Tdg4Ep4wNNWQI2HVdE3YOBKeMDTVkCNh1XRN2DgSnjA01ZAjYdV0Tdj4B1yVij3BIJH7AAAAAElFTkSuQmCC"
]