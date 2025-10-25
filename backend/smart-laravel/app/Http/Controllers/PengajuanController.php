<?php

namespace App\Http\Controllers;

use App\Models\Pengajuan;
use Illuminate\Http\Request;

class PengajuanController extends Controller
{
    public function index() {
        return response()->json(Pengajuan::all());
    }

    public function store(Request $request) {
        $request->validate([
            'nama_poktan' => 'required',
            'nama_barang' => 'required',
            'merek' => 'required',
            'tipe' => 'required',
            'nama_ketua' => 'required',
            'nomor_hp' => 'required',
        ]);
        $pengajuan = Pengajuan::create($request->all());
        return response()->json($pengajuan, 201);
    }

    public function show($id) {
        $pengajuan = Pengajuan::findOrFail($id);
        return response()->json($pengajuan);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'nama_poktan' => 'required',
            'nama_barang' => 'required',
            'merek' => 'required',
            'tipe' => 'required',
            'nama_ketua' => 'required',
            'nomor_hp' => 'required',
        ]);
        $pengajuan = Pengajuan::findOrFail($id);
        $pengajuan->update($request->all());
        return response()->json($pengajuan);
    }

    public function destroy($id) {
        Pengajuan::destroy($id);
        return response()->json(null, 204);
    }
}
