<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discussion extends Model
{
    protected $table = 'discussions';
    public $timestamps = true;

    protected $fillable = [
        'demande_id',
        'admin_id',
        'demandeur_id',
    ];

    public function demande()
    {
        return $this->belongsTo(Demande::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function demandeur()
    {
        return $this->belongsTo(User::class, 'demandeur_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
