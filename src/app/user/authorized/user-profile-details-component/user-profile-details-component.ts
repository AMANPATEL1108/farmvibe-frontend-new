import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfileDetailsService } from './user-profile-details-service';
import { ToastrService } from 'ngx-toastr';

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

  // Store original user data from backend
  originalUser: any = null;

  // Editable user data
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  addresses: any[] = [];
  userId: number | null = null;

  /** ===================== Modal States ===================== */
  editDetailsModal = false;
  imageUploadModal = false;
  addressEditModal = false;
  deleteConfirmModal = false;
  otpModal = false;

  selectedAddress: any = null;
  addressToDelete: number | null = null;

  /** ===================== OTP ===================== */
  enteredOtp: string = '';
  pendingAction: 'profile' | 'address-edit' | 'address-delete' | null = null;
  isSendingOtp: boolean = false;
  isVerifyingOtp: boolean = false;

  // Store pending user data for update after OTP verification
  pendingUserUpdate: any = null;
  pendingAddressUpdate: any = null;

  // Track if form has changes
  hasFormChanges: boolean = false;

  // Development mode flag
  isDevelopmentMode: boolean = true;

  constructor(
    private userProfileService: UserProfileDetailsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  /** ===================== Load Profile ===================== */
  loadUserProfile() {
    this.userProfileService.getProfile().subscribe({
      next: (res) => {
        console.log('Profile:', res);
        this.originalUser = { ...res };
        this.userId = res.user_id;
        this.user.firstName = res.user_firstName;
        this.user.lastName = res.user_lastName;
        this.user.email = res.user_email;
        this.user.phone = res.username;
        this.profileImage = res.profileImageUrl || this.profileImage;

        // Load addresses after profile is loaded
        this.loadAddresses();
        this.toastr.success('Profile loaded successfully');
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.toastr.error('Failed to load profile. Please try again.');
      },
    });
  }

  /** ===================== Load Addresses ===================== */
  loadAddresses() {
    if (this.userId) {
      this.userProfileService.getAddressesByUserId(this.userId).subscribe({
        next: (res: any) => {
          console.log('Addresses:', res);
          if (Array.isArray(res)) {
            this.addresses = res;
          } else if (res.message) {
            this.addresses = [];
            this.toastr.info(res.message);
          } else {
            this.addresses = [];
          }
        },
        error: (err) => {
          console.error('Error loading addresses:', err);
          this.toastr.error('Failed to load addresses. Please try again.');
          this.addresses = [];
        },
      });
    }
  }

  /** ===================== Profile Modals ===================== */
  openEditDetailsModal() {
    this.editDetailsModal = true;
    this.hasFormChanges = false;
  }

  closeEditDetailsModal() {
    this.editDetailsModal = false;
    if (this.originalUser) {
      this.user.firstName = this.originalUser.user_firstName;
      this.user.lastName = this.originalUser.user_lastName;
      this.user.email = this.originalUser.user_email;
      this.user.phone = this.originalUser.username;
    }
  }

  onFormChange() {
    if (this.originalUser) {
      this.hasFormChanges =
        this.user.firstName !== this.originalUser.user_firstName ||
        this.user.lastName !== this.originalUser.user_lastName ||
        this.user.email !== this.originalUser.user_email ||
        this.user.phone !== this.originalUser.username;
    }
  }

  saveProfileWithOtp() {
    if (
      !this.user.firstName ||
      !this.user.lastName ||
      !this.user.email ||
      !this.user.phone
    ) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    if (!this.hasFormChanges) {
      this.toastr.info('No changes detected');
      this.closeEditDetailsModal();
      return;
    }

    this.pendingUserUpdate = {
      user_id: this.originalUser.user_id,
      username: this.user.phone,
      user_firstName: this.user.firstName,
      user_lastName: this.user.lastName,
      user_email: this.user.email,
      user_password: this.originalUser.user_password,
      profileImageUrl: this.originalUser.profileImageUrl,
      role: this.originalUser.role,
      createdDate: this.originalUser.createdDate,
      updatedDate: this.originalUser.updatedDate,
    };

    this.pendingAction = 'profile';
    this.sendOtpForVerification();
  }

  /** ===================== OTP Service Calls ===================== */
  sendOtpForVerification() {
    this.isSendingOtp = true;

    this.userProfileService.sendOtp(this.user.phone).subscribe({
      next: (response: any) => {
        this.isSendingOtp = false;
        if (response.success) {
          this.otpModal = true;
          this.toastr.success('OTP sent successfully');
          this.closeEditDetailsModal();
          this.closeAddressEditModal();
        } else {
          this.toastr.error(response.message || 'Failed to send OTP');
        }
      },
      error: (error: any) => {
        this.isSendingOtp = false;
        console.error('Error sending OTP:', error);

        // Check if it's a development mode error (SMS failed but OTP generated)
        if (
          error.message?.includes('Check backend logs for OTP') ||
          error.message?.includes('SMS delivery failed')
        ) {
          this.isDevelopmentMode = true;
          this.otpModal = true;
          this.toastr.warning(
            'Development Mode: OTP generated. Check backend console for OTP code.'
          );
          this.closeEditDetailsModal();
          this.closeAddressEditModal();
        } else {
          this.toastr.error(
            error.message || 'Failed to send OTP. Please try again.'
          );
        }
      },
    });
  }

  verifyOtp() {
    if (!this.enteredOtp || this.enteredOtp.length !== 6) {
      this.toastr.warning('Please enter a valid 6-digit OTP');
      return;
    }

    this.isVerifyingOtp = true;

    this.userProfileService
      .verifyOtp(this.user.phone, this.enteredOtp)
      .subscribe({
        next: (response: any) => {
          this.isVerifyingOtp = false;
          if (response.success) {
            this.toastr.success('OTP verified successfully');
            this.executePendingAction();
          } else {
            this.toastr.error(
              response.message || 'Invalid OTP. Please try again.'
            );
          }
        },
        error: (error: any) => {
          this.isVerifyingOtp = false;
          console.error('Error verifying OTP:', error);
          this.toastr.error(
            error.message || 'OTP verification failed. Please try again.'
          );
        },
      });
  }

  executePendingAction() {
    if (this.pendingAction === 'profile') {
      this.updateUserProfile();
    } else if (this.pendingAction === 'address-edit') {
      this.updateAddress();
    } else if (this.pendingAction === 'address-delete') {
      this.deleteAddress();
    }
  }

  updateUserProfile() {
    this.userProfileService.updateProfile(this.pendingUserUpdate).subscribe({
      next: (response: any) => {
        console.log('Profile updated successfully:', response);
        this.originalUser = { ...response };
        this.user.firstName = response.user_firstName;
        this.user.lastName = response.user_lastName;
        this.user.email = response.user_email;
        this.user.phone = response.username;

        this.toastr.success('Profile updated successfully');
        this.resetOtpFlow();
      },
      error: (error: any) => {
        console.error('Error updating profile:', error);
        this.toastr.error(
          error.message || 'Failed to update profile. Please try again.'
        );
        this.resetOtpFlow();
      },
    });
  }

  /** ===================== Address Edit ===================== */
  openAddressEditModal(addr: any) {
    this.selectedAddress = { ...addr };
    this.addressEditModal = true;
  }

  closeAddressEditModal() {
    this.addressEditModal = false;
    this.selectedAddress = null;
  }

  saveEditedAddressWithOtp() {
    if (
      !this.selectedAddress.house_number ||
      !this.selectedAddress.street ||
      !this.selectedAddress.area ||
      !this.selectedAddress.city ||
      !this.selectedAddress.pincode
    ) {
      this.toastr.warning('Please fill all address fields');
      return;
    }

    this.pendingAddressUpdate = { ...this.selectedAddress };
    this.pendingAction = 'address-edit';
    this.sendOtpForVerification();
  }

  updateAddress() {
    this.userProfileService
      .updateAddress(
        this.pendingAddressUpdate.address_id,
        this.pendingAddressUpdate
      )
      .subscribe({
        next: (response: any) => {
          console.log('Address updated successfully:', response);
          this.loadAddresses(); // Reload addresses to get updated data
          this.toastr.success('Address updated successfully');
          this.resetOtpFlow();
        },
        error: (error: any) => {
          console.error('Error updating address:', error);
          this.toastr.error(
            error.message || 'Failed to update address. Please try again.'
          );
          this.resetOtpFlow();
        },
      });
  }

  /** ===================== Address Delete ===================== */
  confirmDeleteAddress(addressId: number) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressToDelete = addressId;
      this.pendingAction = 'address-delete';
      this.sendOtpForVerification();
    }
  }

  deleteAddress() {
    if (this.addressToDelete) {
      this.userProfileService.deleteAddress(this.addressToDelete).subscribe({
        next: (response: any) => {
          console.log('Address deleted successfully:', response);
          this.loadAddresses(); // Reload addresses to reflect deletion
          this.toastr.success('Address deleted successfully');
          this.resetOtpFlow();
        },
        error: (error: any) => {
          console.error('Error deleting address:', error);
          this.toastr.error(
            error.message || 'Failed to delete address. Please try again.'
          );
          this.resetOtpFlow();
        },
      });
    }
  }

  /** ===================== OTP Actions ===================== */
  resendOtp() {
    this.isSendingOtp = true;
    this.userProfileService.sendOtp(this.user.phone).subscribe({
      next: (response: any) => {
        this.isSendingOtp = false;
        if (response.success) {
          this.toastr.success('OTP resent successfully');
        } else {
          this.toastr.error(response.message || 'Failed to resend OTP');
        }
      },
      error: (error: any) => {
        this.isSendingOtp = false;
        console.error('Error resending OTP:', error);

        if (
          error.message?.includes('Check backend logs for OTP') ||
          error.message?.includes('SMS delivery failed')
        ) {
          this.toastr.warning(
            'Development Mode: New OTP generated. Check backend console.'
          );
        } else {
          this.toastr.error(
            error.message || 'Failed to resend OTP. Please try again.'
          );
        }
      },
    });
  }

  closeOtpModal() {
    this.toastr.info('OTP verification cancelled');
    this.resetOtpFlow();
  }

  private resetOtpFlow() {
    this.otpModal = false;
    this.enteredOtp = '';
    this.pendingAction = null;
    this.pendingUserUpdate = null;
    this.pendingAddressUpdate = null;
    this.isSendingOtp = false;
    this.isVerifyingOtp = false;
    this.hasFormChanges = false;
    this.addressEditModal = false;
    this.addressToDelete = null;
    this.isDevelopmentMode = false;
  }

  // Image handling methods (keep your existing methods)
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
      this.toastr.success('Profile image updated successfully');
    }
    this.closeImageUpload();
  }

  confirmRemoveImage() {
    if (confirm('Are you sure you want to remove your profile image?')) {
      this.profileImage = '/images/sample-profile.jpg';
      this.toastr.info('Profile image removed');
    }
  }
}
