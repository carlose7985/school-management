<?php

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;

class TwoFactorLoginResponse implements TwoFactorLoginResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        return $request->wantsJson()
            ? redirect()->intended(config('fortify.home'))
            : redirect()->intended(config('fortify.home'));
    }
}
