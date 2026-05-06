@component('mail::message')
# New Contact Form Submission

You have received a new message from your portfolio contact form.

**Name:** {{ $contact->name }}

**Email:** {{ $contact->email }}

@if($contact->phone)
**Phone:** {{ $contact->phone }}

@endif
**Message:**

{{ $contact->message }}

---

*This message was submitted on {{ $contact->created_at->format('F j, Y \a\t g:i A') }}*

@endcomponent

