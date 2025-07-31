import { z } from 'zod';

// Common validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces');

// Login form validation
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// Registration form validation
export const registrationSchema = z.object({
  firstName: nameSchema.refine(val => val.trim().length > 0, 'First name is required'),
  lastName: nameSchema.refine(val => val.trim().length > 0, 'Last name is required'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Career assessment validation
export const assessmentAnswerSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  answer: z.string().min(1, 'Please select an answer'),
});

// Contact form validation
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

// Helper function to format validation errors
export const formatValidationErrors = (error) => {
  const errors = {};
  
  if (error?.errors) {
    error.errors.forEach((err) => {
      const path = err.path.join('.');
      errors[path] = err.message;
    });
  }
  
  return errors;
};

// Helper function to validate form data
export const validateFormData = (schema, data) => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData, errors: {} };
  } catch (error) {
    return { 
      success: false, 
      data: null, 
      errors: formatValidationErrors(error) 
    };
  }
}; 