import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the incoming form data
    const formData = await request.formData();
    
    // Extract text fields
    const registrationData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      uid: formData.get('uid') as string,
      branch: formData.get('branch') as string,
      year: formData.get('year') as string,
      preference1: formData.get('preference1') as string,
      preference2: formData.get('preference2') as string,
      preference3: formData.get('preference3') as string,
      motivation: formData.get('motivation') as string,
      skills: formData.get('skills') as string,
      openToOtherCommittee: formData.get('openToOtherCommittee') as string,
      eventIdea: formData.get('eventIdea') as string,
      resumeDriveLink: formData.get('resumeDriveLink') as string,
    };

    // Validate required fields
    const requiredFields = [
      'name', 'email', 'phone', 'uid', 'branch', 'year',
      'preference1', 'preference2', 'preference3',
      'motivation', 'skills', 'openToOtherCommittee', 'eventIdea'
    ];

    for (const field of requiredFields) {
      if (!registrationData[field as keyof typeof registrationData]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Additional validations
    if (!/^\S+@\S+\.\S+$/.test(registrationData.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(registrationData.phone)) {
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    if (registrationData.uid.length !== 10) {
      return NextResponse.json(
        { error: 'UID must be exactly 10 characters' },
        { status: 400 }
      );
    }

    // Validate Google Drive link if provided
    if (registrationData.resumeDriveLink && 
        !/^https:\/\/(drive\.google\.com|docs\.google\.com)\//.test(registrationData.resumeDriveLink)) {
      return NextResponse.json(
        { error: 'Please provide a valid Google Drive link' },
        { status: 400 }
      );
    }

    // Check if UID already exists
    const existingRegistration = await Registration.findOne({ uid: registrationData.uid });
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'A registration with this UID already exists' },
        { status: 409 }
      );
    }

    // Check if email already exists
    const existingEmail = await Registration.findOne({ email: registrationData.email });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'A registration with this email already exists' },
        { status: 409 }
      );
    }

    // Create new registration
    const registration = new Registration(registrationData);
    await registration.save();

    // Return success response (without sensitive data)
    const responseData = {
      id: registration._id,
      name: registration.name,
      email: registration.email,
      uid: registration.uid,
      createdAt: registration.createdAt,
      hasResume: !!registration.resumeDriveLink
    };

    return NextResponse.json(
      { 
        message: 'Registration submitted successfully!',
        data: responseData
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration submission error:', error);

    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: messages },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { error: `A registration with this ${field} already exists` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    // Get total count of registrations
    const count = await Registration.countDocuments();
    
    return NextResponse.json(
      { 
        message: 'Registration API is working',
        totalRegistrations: count
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API health check error:', error);
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }
}