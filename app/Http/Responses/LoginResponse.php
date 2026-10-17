<?php

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        return $request->wantsJson()
            ? redirect()->intended(config('fortify.home'))
            : redirect()->intended(config('fortify.home'));
    }
}
