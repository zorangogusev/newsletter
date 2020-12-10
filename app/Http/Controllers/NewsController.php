<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;

class NewsController extends Controller
{

    protected $news;
    protected $base_url;

    public function __construct(UrlGenerator $urlGenerator) {
        $this->news = new News;
        $this->base_url = $urlGenerator->to('/');
    }

    public function getAllNews(Request $request)
    {
        $user_token = $request->token;
        $user = auth('users')->authenticate($user_token);
        $user_id = $user->id;
        $all_news = $this->news->where('user_id', $user_id)->orderBy('id', 'DESC')->get()->toArray();

        return response()->json([
            'success' => true,
            'data' => $all_news,
        ], 200);
    }

    public function addNews(Request $request)
    {
        $validator = validator($request->all(), [
            'token' => 'required',
            'category_id' => 'required',
            'title' => 'required',
            'body' => 'required',
            'image' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 200);
        }

        $user_token = $request->token;
        $user = auth('users')->authenticate($user_token);
        $user_id = $user->id;

        $this->news->user_id = $user_id;
        $this->news->category_id = $request->category_id;
        $this->news->title = $request->title;
        $this->news->body = $request->body;
        $this->news->image = $request->image;
        $this->news->save();


        return response()->json([
            'success' => true,
            'message' => 'News added successfully.'
        ]);

    }
}
