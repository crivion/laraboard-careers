<?php
namespace App\Traits;

trait HumanDate {
    public function getHumanCreatedAtAttribute() {
        return $this->created_at->format('jS F Y H:iA');
    }
    public function getHumanUpdatedAtAttribute() {
        return $this->updated_at->format('jS F Y H:iA');
    }
    public function getHumanDeletedAtAttribute() {
        return $this->deleted_at->format('jS F Y H:iA');
    }
}