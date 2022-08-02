<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'can' => [
                    'admin' => $request->user() && $request->user()->isAdmin(),
                    'hr' => $request->user() && $request->user()->isHrRepresentative(),
                ],
            ],
            'images' => [
                'logo' => asset('assets/images/laraboard-logo.png'),
                'homepageHeaderImage' => asset('assets/images/homepage-header-image.png'),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'lang' => function () {
                return json_decode(file_get_contents(base_path('lang/'.app()->getLocale().'/strings.json')), true);
            },
            'csrfToken' => csrf_token(),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ]
        ]);
    }
}
