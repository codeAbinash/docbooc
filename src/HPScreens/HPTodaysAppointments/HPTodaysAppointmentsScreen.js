"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfirmationModal_1 = require("@/HPScreens/components/ConfirmationModal");
const HybridHead_1 = require("@components/HybridHead");
const SafePadding_1 = require("@components/SafePadding");
const Loading03Icon_1 = require("@hugeicons/Loading03Icon");
const TickDouble02Icon_1 = require("@hugeicons/TickDouble02Icon");
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("@utils/client");
const react_1 = require("react");
const react_native_1 = require("react-native");
const PatientCard_1 = require("../components/PatientCard");
const CHIP_ITEMS = [
    { id: 0, name: 'Ongoing', icon: Loading03Icon_1.default },
    { id: 1, name: 'Complete', icon: TickDouble02Icon_1.default },
];
const transformAppointmentToPatientCard = (appointment) => ({
    id: appointment.id,
    name: appointment.patient.fullName || 'N/A',
    age: appointment.patient.dob ? new Date().getFullYear() - new Date(appointment.patient.dob).getFullYear() : 0,
    gender: appointment.patient.gender === 'female' ? 'Female' : appointment.patient.gender === 'male' ? 'Male' : 'Other',
    queuePosition: appointment.queueNo || 0,
    status: appointment.bookingStatus === 'confirmed' ? 'confirmed' : 'provisional',
});
// Component
function HPTodaysAppointmentsScreen() {
    const [activeTab, setActiveTab] = (0, react_1.useState)(0);
    const [expandedCardId, setExpandedCardId] = (0, react_1.useState)(null);
    const [modalVisible, setModalVisible] = (0, react_1.useState)(false);
    const [selectedAction, setSelectedAction] = (0, react_1.useState)(null);
    const [selectedDoctor, setSelectedDoctor] = (0, react_1.useState)();
    const handleChipSelect = (0, react_1.useCallback)((id) => {
        setActiveTab(typeof id === 'number' ? id : Number(id));
    }, []);
    const queryClient = (0, react_query_1.useQueryClient)();
    const isCompleteTab = activeTab === 1;
    const { data: myDoctors } = (0, react_query_1.useQuery)({
        queryKey: ['my-doctors'],
        queryFn: async () => {
            const response = await (await client_1.client.api.v1.hp.doctors['my-doctors'].$get()).json();
            return response.data;
        },
    });
    (0, react_1.useEffect)(() => {
        if (!selectedDoctor && (myDoctors === null || myDoctors === void 0 ? void 0 : myDoctors.length)) {
            setSelectedDoctor(myDoctors[0]);
        }
    }, [myDoctors, selectedDoctor]);
    const { data: todaysAppointments } = (0, react_query_1.useQuery)({
        queryKey: ['todays-appointments', selectedDoctor === null || selectedDoctor === void 0 ? void 0 : selectedDoctor.id],
        queryFn: async () => {
            if (!(selectedDoctor === null || selectedDoctor === void 0 ? void 0 : selectedDoctor.id))
                return [];
            const todayDate = new Date().toISOString().split('T')[0] || '';
            const response = await (await client_1.client.api.v1.hp.bookings.patients.$get({
                query: {
                    date: todayDate,
                    doctorId: selectedDoctor.id,
                },
            })).json();
            return response.data || [];
        },
        enabled: !!(selectedDoctor === null || selectedDoctor === void 0 ? void 0 : selectedDoctor.id),
    });
    const filteredAppointments = (todaysAppointments || []).filter((appointment) => {
        if (activeTab === 1) {
            return appointment.visitStatus === 'complete';
        }
        return appointment.visitStatus !== 'complete';
    });
    // Handlers
    const handleToggleCard = (0, react_1.useCallback)((id) => {
        setExpandedCardId((prev) => (prev === id ? null : id));
    }, []);
    const handleConfirmation = (0, react_1.useCallback)((action, patient) => {
        const actionType = isCompleteTab && action === 'cancel' ? 'move-to-ongoing' : action;
        const transformedPatient = transformAppointmentToPatientCard(patient);
        setSelectedAction({ type: actionType, patientId: patient.id, patient, transformedPatient });
        setModalVisible(true);
    }, [isCompleteTab]);
    const handleConfirm = (0, react_1.useCallback)(async () => {
        var _a;
        if (!selectedAction)
            return;
        setModalVisible(false);
        try {
            if (selectedAction.type === 'complete') {
                const res = await client_1.client.api.v1.hp.bookings.patients[':bookingId'].status.$put({
                    param: { bookingId: selectedAction.patientId },
                    json: { visitStatus: 'complete' },
                });
                const data = await res.json();
                console.log('booking updated', data);
            }
            queryClient.invalidateQueries({ queryKey: ['todays-appointments', (_a = selectedDoctor === null || selectedDoctor === void 0 ? void 0 : selectedDoctor.id) !== null && _a !== void 0 ? _a : ''] });
        }
        catch (err) {
            console.error('Failed to update booking status', err);
        }
        finally {
            setSelectedAction(null);
        }
    }, [selectedAction, queryClient, selectedDoctor === null || selectedDoctor === void 0 ? void 0 : selectedDoctor.id]);
    const handleCloseModal = (0, react_1.useCallback)(() => {
        setModalVisible(false);
        setSelectedAction(null);
    }, []);
    const renderPatientCard = (0, react_1.useCallback)(({ item }) => {
        const transformedPatient = transformAppointmentToPatientCard(item);
        return (<PatientCard_1.default patient={transformedPatient} isExpanded={expandedCardId === item.id} onToggle={handleToggleCard} isCompleteTab={isCompleteTab} onCancel={() => handleConfirmation('cancel', item)} onComplete={() => handleConfirmation('complete', item)} onMoveToOngoing={() => handleConfirmation('move-to-ongoing', item)}/>);
    }, [expandedCardId, isCompleteTab, handleToggleCard, handleConfirmation]);
    const keyExtractor = (0, react_1.useCallback)((item) => item.id, []);
    return (<react_native_1.View className='flex-1 bg-white dark:bg-neutral-900'>
      <HybridHead_1.default searchPlaceholder='Search doctors, specialties...' showMenu={true} showDoctorInfo={true} chipItems={CHIP_ITEMS} selectedChipId={activeTab} onChipSelect={handleChipSelect} doctors={myDoctors || []} doctorInfo={selectedDoctor} onDoctorSelect={setSelectedDoctor}/>

      {selectedAction && (<ConfirmationModal_1.default visible={modalVisible} onClose={handleCloseModal} onConfirm={handleConfirm} title={`Do you want to ${selectedAction.type} this appointment?`} actionType={selectedAction.type} patient={selectedAction.transformedPatient}/>)}

      <react_native_1.FlatList data={filteredAppointments} renderItem={renderPatientCard} keyExtractor={keyExtractor} contentContainerClassName='px-5 pt-1' showsVerticalScrollIndicator={false} ListFooterComponent={SafePadding_1.PaddingBottom}/>
    </react_native_1.View>);
}
exports.default = (0, react_1.memo)(HPTodaysAppointmentsScreen);
