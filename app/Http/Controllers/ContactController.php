<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Store a new contact submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:5000',
        ]);

        // Save to database
        $contact = Contact::create($validated);

        // Send email notification
        Mail::to(config('mail.from.address'))->send(new ContactFormMail($contact));

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your message! I will get back to you soon.',
        ]);
    }
}

