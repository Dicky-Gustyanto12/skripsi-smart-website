<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengajuan extends Model
{
    protected $table = 'pengajuan';
    protected $primaryKey = 'id_pengajuan';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id_pengajuan',
        'nama_poktan',
        'nama_barang',
        'merek',
        'tipe',
        'nama_ketua',
        'nomor_hp'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->id_pengajuan) {
                $latest = self::orderBy('id_pengajuan', 'desc')->first();
                if ($latest) {
                    $last = intval(substr($latest->id_pengajuan, 2));
                    $next = $last + 1;
                } else {
                    $next = 1;
                }
                $model->id_pengajuan = 'PJ' . str_pad($next, 3, '0', STR_PAD_LEFT);
            }
        });
    }
}
