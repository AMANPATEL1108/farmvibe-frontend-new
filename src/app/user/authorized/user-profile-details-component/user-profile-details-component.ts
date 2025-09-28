import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfileDetailsService } from './user-profile-details-service';

@Component({
  selector: 'app-user-profile-details-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile-details-component.html',
  styleUrls: ['./user-profile-details-component.css'],
})
export class UserProfileDetailsComponent implements OnInit {
  profileImage = '/images/sample-profile.jpg';
  previewImage: string | ArrayBuffer | null = null;

  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  addresses = [
    {
      id: 1,
      first_name: 'Aman',
      last_name: 'Patel',
      email: 'aman@example.com',
      number: '9876543210',
      house_number: '123',
      street: 'Main Street',
      area: 'Sector 5',
      city: 'Ahmedabad',
      pincode: '380001',
    },
    {
      id: 2,
      first_name: 'Aman',
      last_name: 'Patel',
      email: 'aman@example.com',
      number: '9876543210',
      house_number: '456',
      street: 'MG Road',
      area: 'Satellite',
      city: 'Ahmedabad',
      pincode: '380015',
    },
  ];

  /** ===================== Modal States ===================== */
  editDetailsModal = false;
  imageUploadModal = false;
  addressEditModal = false;
  deleteConfirmModal = false;
  otpModal = false;

  selectedAddress: any = null;
  addressToDelete: number | null = null;

  /** ===================== OTP ===================== */
  generatedOtp: string = '';
  enteredOtp: string = '';
  pendingAction: 'profile' | 'address-edit' | 'address-delete' | null = null;

  constructor(private userProfileService: UserProfileDetailsService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  /** ===================== Load Profile ===================== */
  loadUserProfile() {
    this.userProfileService.getProfile().subscribe({
      next: (res) => {
        console.log('Profile:', res);
        this.user.firstName = res.user_firstName;
        this.user.lastName = res.user_lastName;
        this.user.email = res.user_email;
        this.user.phone = res.username; // use username as phone
        this.profileImage = res.profileImageUrl || this.profileImage;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
      },
    });
  }

  /** ===================== Profile Modals ===================== */
  openEditDetailsModal() {
    this.editDetailsModal = true;
  }
  closeEditDetailsModal() {
    this.editDetailsModal = false;
  }

  saveProfileWithOtp() {
    this.pendingAction = 'profile';
    this.generatedOtp = this.generateOtp();
    console.log('Generated OTP (profile):', this.generatedOtp);
    this.otpModal = true;
    this.closeEditDetailsModal();
  }

  openImageUpload() {
    this.previewImage = null;
    this.imageUploadModal = true;
  }
  closeImageUpload() {
    this.imageUploadModal = false;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfileImage() {
    if (this.previewImage) {
      this.profileImage = this.previewImage.toString();
    }
    this.closeImageUpload();
  }

  confirmRemoveImage() {
    if (confirm('Are you sure you want to remove your profile image?')) {
      this.profileImage = '/images/sample-profile.jpg';
    }
  }

  /** ===================== Address Edit ===================== */
  openAddressEditModal(addr: any) {
    this.selectedAddress = { ...addr };
    this.addressEditModal = true;
  }
  closeAddressEditModal() {
    this.addressEditModal = false;
  }

  saveEditedAddressWithOtp() {
    this.pendingAction = 'address-edit';
    this.generatedOtp = this.generateOtp();
    console.log('Generated OTP (address edit):', this.generatedOtp);
    this.otpModal = true;
    this.closeAddressEditModal();
  }

  /** ===================== Address Delete ===================== */
  confirmDeleteAddress(id: number) {
    this.addressToDelete = id;
    this.pendingAction = 'address-delete';
    this.generatedOtp = this.generateOtp();
    console.log('Generated OTP (delete):', this.generatedOtp);
    this.otpModal = true;
  }

  /** ===================== OTP Actions ===================== */
  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  verifyOtp() {
    if (this.enteredOtp === this.generatedOtp) {
      if (this.pendingAction === 'profile') {
        alert('✅ Profile updated successfully!');
      } else if (this.pendingAction === 'address-edit') {
        const index = this.addresses.findIndex(
          (a) => a.id === this.selectedAddress.id
        );
        if (index !== -1) this.addresses[index] = this.selectedAddress;
        alert('✅ Address updated successfully!');
      } else if (this.pendingAction === 'address-delete') {
        this.addresses = this.addresses.filter(
          (a) => a.id !== this.addressToDelete
        );
        alert('✅ Address deleted successfully!');
      }
      this.resetOtpFlow();
    } else {
      alert('❌ Invalid OTP. Please try again.');
    }
  }

  resendOtp() {
    this.generatedOtp = this.generateOtp();
    console.log('Resent OTP:', this.generatedOtp);
    alert('OTP resent.');
  }

  closeOtpModal() {
    this.resetOtpFlow();
  }

  private resetOtpFlow() {
    this.otpModal = false;
    this.enteredOtp = '';
    this.pendingAction = null;
  }
}
