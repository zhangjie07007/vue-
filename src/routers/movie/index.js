export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: 'dail/:movieId',
            components: {
                default: () => import('@/components/NowPlaying'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: "dail1/:id",
            components:{
                default:()=>import('@/components/ComingSoon'),
                detail:()=>import('@/views/Movie/detail'),
            },
            props:{
                detail:true
            }

        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }
    ]
}