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

    public function getAllNews($token, $pagination = null)
    {
        $user = auth('users')->authenticate($token);
        $user_id = $user->id;
        $file_directory = $this->base_url . '/news_images';

        if ($pagination == null) {
            $all_news = $this->news->where('user_id', $user_id)->orderBy('id', 'DESC')->get()->toArray();
            return response()->json([
                'success' => true,
                'data' => $all_news,
                'file_directory' => $file_directory,
            ], 200);
        }

        $all_news = $this->news->where('user_id', $user_id)->orderBy('id', 'DESC')->paginate($pagination);
        return response()->json([
            'success' => true,
            'data' => $all_news,
            'file_directory' => $file_directory,
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

        $news_image = $request->display_image;
        $image_file_name = '';
        if($news_image == null) {
            $image_file_name = 'default-image-for-news.jpg';
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

    public function getSingleNews($token, $id)
    {
        $file_directory = $this->base_url . '/news_images';
        $user = auth('users')->authenticate($token);
        $user_id = $user->id;


        $findData = $this->news::where('user_id', $user_id)->find($id);
        if(!$findData) {
            return response()->json([
                'success' => false,
                'message' => 'news with this id doesnt exist '
            ], 200);
        }

        return response()->json([
            'success' => false,
            'data' => $findData,
            'file_directory' => $file_directory
        ], 200);
    }

    public function editNews(Request $request, $id)
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
        $find_news_for_edit = $this->news::where('user_id', $user_id)->find($id);

        if(!$find_news_for_edit) {
            return response()->json([
                'success' => false,
                'message' => 'This news has no valid id'
            ], 200);
        }

        $image_news_name_from_database = $find_news_for_edit->image;
        $image_news_name_from_database == 'default-image-for-news.jpg' ? : unlink(public_path() . '/news_images/' . $image_news_name_from_database);
        $new_news_image = $request->display_image;
        $image_file_name = '';

        if($new_news_image == null) {
            $image_file_name = 'default-image-for-news.jpg';
        } else {
            $generate_name = uniqid() . '_' . time() . date('Ymd');
            $base64Image = $new_news_image;
            $fileBin = file_get_contents($base64Image);
            $mimetype = mime_content_type($base64Image);

            if($mimetype == 'image/png') {
                $image_file_name = $generate_name . '.png';
            } else if($mimetype == 'image/jpeg') {
                $image_file_name = $generate_name . '.jpeg';
            } else if($mimetype == 'image/jpg') {
                $image_file_name = $generate_name . '.jpg';
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Only png, jpg and jpeg files are accepted for setting profile pictures'
                ], 200);
            }
        }

        $find_news_for_edit->user_id = $user_id;
        $find_news_for_edit->category_id = $request->category_id;
        $find_news_for_edit->title = $request->title;
        $find_news_for_edit->body = $request->body;
        $find_news_for_edit->image = $image_file_name;
        $find_news_for_edit->save();

        if($new_news_image == null) {

        } else {
            file_put_contents('./news_images/' . $image_file_name, $fileBin);
        }

        return response()->json([
            'success' => true,
            'message' => 'News edited successfully.'
        ], 200);
    }

    public function deleteNews($token, $id)
    {
        $user = auth('users')->authenticate($token);
        $user_id = $user->id;
        $getNewsFromDatabase = $this->news::where('user_id', $user_id)->find($id);

        if(!$getNewsFromDatabase) {
            return response()->json([
                'success' => false,
                'message' => 'News with this id doesnt exist '
            ], 200);
        }

        $getFile = $getNewsFromDatabase->image;
        if($getNewsFromDatabase->delete()) {
            $getFile == 'default-image-for-news.jpg' ? : unlink(public_path() . '/news_images/' . $getFile);

            return response()->json([
                'success' => true,
                'message' => 'News deleted successfully.'
            ]);
        }
    }
}
