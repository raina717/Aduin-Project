// Code generated by mockery v2.33.2. DO NOT EDIT.

package mocks

import (
	context "context"

	candishared "github.com/golangid/candi/candishared"

	domain "service-auth/internal/modules/user/domain"

	mock "github.com/stretchr/testify/mock"
)

// UserUsecase is an autogenerated mock type for the UserUsecase type
type UserUsecase struct {
	mock.Mock
}

// CreateUser provides a mock function with given fields: ctx, data
func (_m *UserUsecase) CreateUser(ctx context.Context, data *domain.RequestUser) (domain.ResponseUser, error) {
	ret := _m.Called(ctx, data)

	var r0 domain.ResponseUser
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *domain.RequestUser) (domain.ResponseUser, error)); ok {
		return rf(ctx, data)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *domain.RequestUser) domain.ResponseUser); ok {
		r0 = rf(ctx, data)
	} else {
		r0 = ret.Get(0).(domain.ResponseUser)
	}

	if rf, ok := ret.Get(1).(func(context.Context, *domain.RequestUser) error); ok {
		r1 = rf(ctx, data)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DeleteUser provides a mock function with given fields: ctx, id
func (_m *UserUsecase) DeleteUser(ctx context.Context, id int) error {
	ret := _m.Called(ctx, id)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, int) error); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// GetAllUser provides a mock function with given fields: ctx, filter
func (_m *UserUsecase) GetAllUser(ctx context.Context, filter *domain.FilterUser) ([]domain.ResponseUser, candishared.Meta, error) {
	ret := _m.Called(ctx, filter)

	var r0 []domain.ResponseUser
	var r1 candishared.Meta
	var r2 error
	if rf, ok := ret.Get(0).(func(context.Context, *domain.FilterUser) ([]domain.ResponseUser, candishared.Meta, error)); ok {
		return rf(ctx, filter)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *domain.FilterUser) []domain.ResponseUser); ok {
		r0 = rf(ctx, filter)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]domain.ResponseUser)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *domain.FilterUser) candishared.Meta); ok {
		r1 = rf(ctx, filter)
	} else {
		r1 = ret.Get(1).(candishared.Meta)
	}

	if rf, ok := ret.Get(2).(func(context.Context, *domain.FilterUser) error); ok {
		r2 = rf(ctx, filter)
	} else {
		r2 = ret.Error(2)
	}

	return r0, r1, r2
}

// GetDetailUser provides a mock function with given fields: ctx, id
func (_m *UserUsecase) GetDetailUser(ctx context.Context, id int) (domain.ResponseUser, error) {
	ret := _m.Called(ctx, id)

	var r0 domain.ResponseUser
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, int) (domain.ResponseUser, error)); ok {
		return rf(ctx, id)
	}
	if rf, ok := ret.Get(0).(func(context.Context, int) domain.ResponseUser); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Get(0).(domain.ResponseUser)
	}

	if rf, ok := ret.Get(1).(func(context.Context, int) error); ok {
		r1 = rf(ctx, id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// UpdateUser provides a mock function with given fields: ctx, data
func (_m *UserUsecase) UpdateUser(ctx context.Context, data *domain.RequestUser) error {
	ret := _m.Called(ctx, data)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, *domain.RequestUser) error); ok {
		r0 = rf(ctx, data)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// NewUserUsecase creates a new instance of UserUsecase. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewUserUsecase(t interface {
	mock.TestingT
	Cleanup(func())
}) *UserUsecase {
	mock := &UserUsecase{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
