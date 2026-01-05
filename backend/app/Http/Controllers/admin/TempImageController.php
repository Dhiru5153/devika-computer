<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\TempVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class TempImageController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:png,jpg,jpeg,gif'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors('image')
            ]);
        }

        $image = $request->image;
        $ext = $image->getClientOriginalExtension();
        $imageName = strtotime('now').'.'.$ext;
        $model = new TempImage();
        $model->name = $imageName;
        $model->save();

        $image->move(public_path('uploads/temp'),$imageName);
        // create small thumbnail here
        $sourcePath = public_path('uploads/temp/'.$imageName);
        $destPath = public_path('uploads/temp/thumb/'.$imageName);
        $manager = new ImageManager(Driver::class);
        $image = $manager->read($sourcePath);
        $image->coverDown(300, 300);
        $image->save($destPath);

        return response()->json([
            'status' => true,
            'data' => $model,
            'message' => 'Image uploaded successfully!'
        ]);
    }

    
    public function storeVideo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'video' => 'required|mimes:mp4,mov,avi,wmv,mkv|max:51200' // 50MB
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->first('video')
            ]);
        }

        $video = $request->file('video');
        $ext = $video->getClientOriginalExtension();
        $videoName = time().'.'.$ext;

        // Save DB
        $model = new TempVideo();
        $model->name = $videoName;
        $model->save();

        // Move Video
        $video->move(public_path('uploads/temp/video'), $videoName);

        return response()->json([
            'status' => true,
            'data' => $model,
            'message' => 'Video uploaded successfully!'
        ]);
    }
}
