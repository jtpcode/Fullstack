import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';

import { Patient } from '../../types';
import patientService from '../../services/patients';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const patientData = await patientService.getById(id);
        setPatient(patientData);
      } catch (err) {
        console.error('Error fetching patient:', err);
      }
    };

    void fetchPatient();
  }, [id]);

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <Male />;
      case 'female':
        return <Female />;
      case 'other':
        return <Transgender />;
      default:
        return null;
    }
  };

  if (!patient) {
    return (
      <Box>
        <Typography variant="h6">Loading patient data...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mt={3} mb={3}>
        <Typography variant="h4">
          {patient.name}
        </Typography>
        {getGenderIcon(patient.gender)}
      </Box>

      <Box>        
        <Box mb={2}>
          <Typography variant="body1">
            <strong>SSN:</strong> {patient.ssn || '-'}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="body1">
            <strong>Occupation:</strong> {patient.occupation}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientPage;
