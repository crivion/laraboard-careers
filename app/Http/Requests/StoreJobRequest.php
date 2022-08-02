<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'job_title' => 'required',
            'job_description' => 'required',
            'department_id' => 'required|exists:departments,id',
            'location_id' => 'required|exists:locations,id',
            'contract_type_id' => 'required|exists:contract_types,id',
            'expires_at' => 'nullable|date|after:today',
        ];
    }
}
