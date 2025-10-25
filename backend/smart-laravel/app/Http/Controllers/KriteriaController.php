<?php

namespace App\Http\Controllers;

use App\Models\Kriteria;
use Illuminate\Http\Request;

class KriteriaController extends Controller
{
    public function index() {
        return response()->json(Kriteria::orderBy('kode')->get());
    }

    public function store(Request $request) {
        $request->validate([
            'kode' => 'required',
            'kriteria' => 'required',
            'bobot' => 'required|integer',
        ]);
        $kriteria = Kriteria::create($request->all());
        return response()->json($kriteria, 201);
    }

    public function show($id) {
        $data = Kriteria::findOrFail($id);
        return response()->json($data);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'kode' => 'required',
            'kriteria' => 'required',
            'bobot' => 'required|integer',
        ]);
        $data = Kriteria::findOrFail($id);
        $data->update($request->all());
        return response()->json($data);
    }

    public function destroy($id) {
        Kriteria::destroy($id);
        return response()->json(null, 204);
    }
}
