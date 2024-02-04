import { yupResolver } from '@hookform/resolvers/yup';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authenticationActions } from '../../redux/reducers/authentication.reducer';
import { performSignUp } from '../../utils/authentication';

function SignUpPage(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authenticatedUser = useSelector(state => state.authenticatedUser);
    
    useEffect(() => {
        if (authenticatedUser.id) {
            navigate('/');
        }
    }, [authenticatedUser.id, navigate]);

    const paperStyle = {
        height: '70vh',
        width: '90%',
        margin: 'auto',
        maxWidth: '400px'
    };
    const avatarStyle={
        backgroundColor: 'green'
    }

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup
            .string()
            .required('Password is required')
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Password must be of at least 8 characters with at least uppercase, lowercase, special character and number'
            ),
            confirmPassword: Yup
            .string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                'Password must be of at least 8 characters with at least uppercase, lowercase, special character and number'
            )
    });

    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(validationSchema),
    });

const onSubmit = (data) => {
    const res = performSignUp(data);
    if(typeof res === 'string') {
        console.log(res)
    } else {
       dispatch(authenticationActions.setLogInUser(res));
        return navigate('/comments');
    }
}
    return (
        <Container>
        <Grid mt={5} alignContent={'center'} >
            <Paper style={paperStyle} sx={{p:4}} elevation={4}>
                <Grid align="center" mb={4}>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <Typography mt={2} component={'h2'} variant='h5'>Sign Up</Typography>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="fullName"
                        label="Full Name"
                        type="text"
                        id="fullName"
                        {...register('fullName')}
                        error={Boolean(errors?.fullName?.message)}
                        helperText={errors?.fullName?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        {...register('email')}
                        error={Boolean(errors?.email?.message)}
                        helperText={errors?.email?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        {...register('password')}
                        error={Boolean(errors?.password?.message)}
                        helperText={errors?.password?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        error={Boolean(errors?.confirmPassword?.message)}
                        helperText={errors?.confirmPassword?.message}
                    />
                    <Button
                        type="submit"
                        style={{width: '120px', marginTop: '20px', textAlign: 'center'}}
                        variant="contained"
                        color="primary"
                    >Sign Up</Button>
                    <Typography mt={1}>Don't have an account yet? <Link to="/signin" >Sign In</Link></Typography>
                </form>
            </Paper>
        </Grid>
        </Container>
       
    );
}

export default SignUpPage;