<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class MemberController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->instagram_url = $request->instagram_url;
        $member->facebook_url = $request->facebook_url;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        // Save Temp Image Here
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$member->id.'.'.$ext;

                // Create small thumbnail
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/members/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 550);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => "Member added successfully!"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $member = Member::find($id);
        if ($member == null){
            return response()->json([
                'status' => false,
                'message' => 'Member not found!'
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $member
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $member = Member::find($id);
        if ($member == null){
            return response()->json([
                'status' => false,
                'message' => 'Member not found!'
            ]);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->instagram_url = $request->instagram_url;
        $member->facebook_url = $request->facebook_url;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        // Save Temp Image Here
        if ($request->imageId > 0) {
            $oldImage = $member->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$member->id.'.'.$ext;

                // Create small thumbnail
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/members/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 550);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();

                if ($oldImage != '') {
                    File::delete(public_path('uploads/members/'.$oldImage));
                }
            }
        }
        
        return response()->json([
            'status' => true,
            'message' => "Member updated successfully."
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $member = Member::find($id);
        if ($member == null){
            return response()->json([
                'status' => false,
                'message' => 'Member not found!'
            ]);
        }
        File::delete(public_path('uploads/members/'.$member->image));
        $member->delete();
        return response()->json([
            'status' => true,
            'message' => 'Member deleted successfully!'
        ]);
    }
}
