<?php
namespace App\Traits;

trait HumanDate {
    public function getHumanCreatedAtAttribute() {
        if($this->created_at instanceof \Carbon\Carbon)
            return $this->created_at->format('jS F Y H:iA');
        return $this->created_at;
    }
}