<?php

namespace App\Http\Controllers\Admin;

use App\Models\ContractType as Contract;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

use Illuminate\Http\Request;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contracts = Contract::withCount(['jobs'])->orderBy('contract_type_name')->get();
        return Inertia::render('Dashboard/ContractTypes', compact('contracts'));
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

        $request->validate(['contract_type_name' => 'required|unique:contract_types,contract_type_name']);

        $contract = new Contract();
        $contract->contract_type_name = $request->contract_type_name;
        $contract->save();

        session()->flash('success', 'Contract type successfully created');

        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Contract $contract)
    {
        return $contract;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Contract $contract, Request $request)
    {
        $request->validate(['contract_type_name' => 'required']);

        if (Contract::where('contract_type_name', $request->contract_type_name)->where('id', '!=', $contract->id)->exists()) {
            session()->flash('error', 'Contract type already exists');
            return back();
        }

        $contract->contract_type_name = $request->contract_type_name;
        $contract->save();

        session()->flash('success', 'Contract type updated.');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contract $contract)
    {

        if ($contract->jobs()->exists()) {
            session()->flash('error', 'Cannot delete this contract type as it contains jobs. First, relocate the jobs in another contract type then you can delete this one.');
            return back();
        }

        $contract->delete();

        session()->flash('success', 'Successfully deleted contract type');

        return back();
    }
}
