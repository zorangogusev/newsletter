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
            'body' => 'required'
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

        $news_image = $request->image;
        $image_file_name = '';
        if($news_image == null) {
            $image_file_name = 'news-default-image.png';
        } else {
            $generate_name_for_image = uniqid() . '_' . time() . date('Ymd');
            $base64Image = $news_image;
            $fileBin = file_get_contents($base64Image);
            $mimetype = mime_content_type($base64Image);

            if($mimetype == 'image/png') {
                $image_file_name = $generate_name_for_image . '.png';
            } else if($mimetype == 'image/jpeg') {
                $image_file_name = $generate_name_for_image . '.jpeg';
            } else if($mimetype == 'image/jpg') {
                $image_file_name = $generate_name_for_image . '.jpg';
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Only png, jpg and jpeg files are accepted for setting profile pictures'
                ], 200);
            }
        }

        if($news_image == null) {

        } else {
            file_put_contents('./news_images/' . $image_file_name, $fileBin);
        }

        $this->news->user_id = $user_id;
        $this->news->category_id = $request->category_id;
        $this->news->title = $request->title;
        $this->news->body = $request->body;
        $this->news->image = $image_file_name;
        $this->news->save();


        return response()->json([
            'success' => true,
            'message' => 'News added successfully.'
        ], 200);

    }
}
