<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('short_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('slug')->unique(); // Nama shortlink yang unik
            $table->text('link_1'); // URL tujuan pertama
            $table->text('link_2'); // URL tujuan kedua
            $table->unsignedTinyInteger('current_target')->default(1); // Penanda: 1 untuk link_1, 2 untuk link_2
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('short_links');
    }
};
