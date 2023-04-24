<?php

namespace App\Http\Controllers\Admin;

use App\Models\Location;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

use Illuminate\Http\Request;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $locations = Location::withCount(['jobs'])->orderBy('location_name')->get();
        return Inertia::render('Dashboard/Locations', compact('locations'));
        //
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate(['location_name' => 'required|unique:locations,location_name']);

        $location = new Location();
        $location->location_name = $request->location_name;
        $location->save();

        session()->flash('success', 'Location successfully created');

        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Location $location)
    {
        return $location;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Location $location, Request $request)
    {
        $request->validate(['location_name' => 'required']);

        if (Location::where('location_name', $request->location_name)->where('id', '!=', $location->id)->exists()) {
            session()->flash('error', 'Location name already exists');
            return back();
        }

        $location->location_name = $request->location_name;
        $location->save();

        session()->flash('success', 'Location name updated.');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Location $location)
    {

        if ($location->jobs()->exists()) {
            session()->flash('error', 'Cannot delete this location as it contains jobs. First, relocate the jobs in another location then you can delete this one.');
            return back();
        }

        $location->delete();

        session()->flash('success', 'Successfully deleted location');

        return back();
    }
}
