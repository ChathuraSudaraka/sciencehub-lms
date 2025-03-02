<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])
    ->prefix('console')
    ->name('console.')
    ->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('console/Dashboard');
        })->name('dashboard');

        Route::prefix('students')->name('students.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('Students');
            })->name('index');

            Route::get('/{student}', function ($student) {
                return Inertia::render('Student', [
                    'student' => $student,
                ]);
            })->name('show');
        });

        Route::prefix('/classes')->name('classes.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('Classes');
            })->name('index');

            Route::get('/{class}', function ($class) {
                return Inertia::render('Class', [
                    'class' => $class,
                ]);
            })->name('show');
        });
    });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
