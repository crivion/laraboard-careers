<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departments = Department::withCount(['jobs'])->orderBy('department_name')->get();
        return Inertia::render('Dashboard/Departments', compact('departments'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(['department_name' => 'required|unique:departments,department_name']);

        $department = new Department();
        $department->department_name = $request->department_name;
        $department->save();


        session()->flash('success', 'Department successfully created');

        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Department $department)
    {
        return $department;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Department $department, Request $request)
    {
        $request->validate(['department_name' => 'required']);

        if (Department::where('department_name', $request->department_name)->where('id', '!=', $department->id)->exists()) {
            session()->flash('error', 'Department name already exists');
            return back();
        }

        $department->department_name = $request->department_name;
        $department->save();

        session()->flash('success', 'Department name updated.');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Department $department)
    {
        if ($department->jobs()->exists()) {
            session()->flash('error', 'Cannot delete this Department as it contains jobs. First, relocate the jobs in another Department then you can delete this one.');
            return back();
        }

        $department->delete();

        session()->flash('success', 'Successfully deleted department');

        return back();
    }
}
