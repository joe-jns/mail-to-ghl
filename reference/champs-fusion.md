# Champs de fusion de l'éditeur d'email GHL

Relevés en 2026-11 dans le sélecteur « Valeurs personnalisées » de l'éditeur d'email. Les champs personnalisés
de votre sous-compte s'y ajoutent (catégorie Contact) : les lire dans l'éditeur (`store.state.customFieldsLocation`).

## Menu : Valeurs personnalisées

### Contact

- `{{contact.name}}` — Nom complet
- `{{contact.first_name}}` — Prénom
- `{{contact.last_name}}` — Nom de famille
- `{{contact.email}}` — E-mail
- `{{contact.phone}}` — Téléphone
- `{{contact.company_name}}` — Nom de l'Entreprise
- `{{contact.full_address}}` — Adresse complète
- `{{contact.address1}}` — Adresse 1
- `{{contact.city}}` — Ville
- `{{contact.state}}` — État
- `{{contact.postal_code}}` — Code postal
- `{{contact.date_of_birth}}` — Date de naissance
- `{{contact.source}}` — Source
- `{{contact.website}}` — Site web
- `{{contact.type}}` — Type de contact

#### Contact › Champs personnalisés


### entreprise

- `{{business.name}}` — Nom
- `{{business.email}}` — E-mail
- `{{business.phone}}` — Téléphone
- `{{business.website}}` — Site web
- `{{business.address}}` — Adresse
- `{{business.city}}` — Ville
- `{{business.state}}` — État
- `{{business.country}}` — Pays
- `{{business.postalCode}}` — Code postal
- `{{business.description}}` — Description

### Utilisateur

- `{{user.name}}` — Nom complet
- `{{user.first_name}}` — Prénom
- `{{user.last_name}}` — Nom de famille
- `{{user.email}}` — E-mail
- `{{user.phone}}` — Téléphone
- `{{user.email_signature}}` — Signature
- `{{user.calendar_link}}` — Lien vers le calendrier
- `{{user.twilio_phone_number}}` — Téléphone Twilio

### Rendez-vous

- `{{appointment.title}}` — Titre
- `{{appointment.start_time}}` — Date et heure de début
- `{{appointment.only_start_date}}` — Date de début
- `{{appointment.only_start_time}}` — Heure de début
- `{{appointment.end_time}}` — Date et heure de fin
- `{{appointment.only_end_date}}` — Date de fin
- `{{appointment.timezone}}` — Fuseau horaire
- `{{appointment.cancellation_link}}` — Lien d'annulation
- `{{appointment.reschedule_link}}` — Lien de reprogrammation
- `{{appointment.meeting_location}}` — Lieu de la réunion
- `{{appointment.notes}}` — Remarques
- `{{appointment.add_to_google_calendar}}` — Ajouter à Google Agenda
- `{{appointment.add_to_ical_outlook}}` — Ajouter à iCal/Outlook

### Campagne

- `{{campaign.event_date_time}}` — Date et heure de l'événement
- `{{campaign.event_date}}` — Date de l'événement
- `{{campaign.event_time}}` — Heure de l'événement

### Message

- `{{message.body}}` — Corps du message

### Compte

- `{{location.name}}` — Nom
- `{{location.full_address}}` — Adresse complète
- `{{location.address}}` — Adresse Ligne 1
- `{{location.city}}` — Ville
- `{{location.state}}` — État
- `{{location.country}}` — Pays
- `{{location.postal_code}}` — Code postal
- `{{location.email}}` — E-mail
- `{{location.phone}}` — Téléphone
- `{{location.website}}` — Site web
- `{{location.logo_url}}` — Propriétaire

#### Compte › Propriétaire

- `{{location_owner.first_name}}` — Prénom
- `{{location_owner.last_name}}` — Nom de famille
- `{{location_owner.email}}` — E-mail

### Maintenant

- `{{right_now.second}}` — Seconde
- `{{right_now.minute}}` — Minute
- `{{right_now.hour}}` — Heure au format 24 h
- `{{right_now.hour_ampm}}` — Heure au format AM/PM
- `{{right_now.time}}` — Horaire au format 24 h
- `{{right_now.time_ampm}}` — Horaire au format AM/PM
- `{{right_now.ampm}}` — AM/PM
- `{{right_now.day}}` — Jour
- `{{right_now.day_of_week}}` — Jour de la semaine en toutes lettres en français
- `{{right_now.month}}` — Mois
- `{{right_now.month_english}}` — Mois en toutes lettres en anglais
- `{{right_now.year}}` — Année
- `{{right_now.middle_endian_date}}` — Date (mois/jour/année)
- `{{right_now.little_endian_date}}` — Date (jour/mois/année)

### E-mail

- `{{email.unsubscribe_link}}` — Lien de désinscription
- `{{email.view_in_browser_url}}` — Prévisualiser dans le navigateur
- `{{email.preference_management_link}}` — Gestion des préférences

### Contacts adhérents

- `{{membership_contact.email}}` — E-mail
- `{{membership_contact.login_url}}` — URL de connexion (lien magique)
- `{{membership_contact.offer_title}}` — Titre de l'offre
- `{{membership_contact.category_url}}` — URL de la catégorie
- `{{membership_contact.product_title}}` — Titre du produit
- `{{membership_contact.category_title}}` — Titre de la catégorie
- `{{membership_contact.support_email}}` — E-mail d'assistance
- `{{membership_contact.support_phone}}` — Téléphone
- `{{membership_contact.site_name}}` — Nom du site
- `{{membership_contact.post_title}}` — titre
- `{{membership_contact.post_url}}` — URL du cours
- `{{membership_contact.product_url}}` — URL du produit
- `{{membership_contact.comment_url}}` — URL du commentaire
- `{{membership_contact.recipient_name}}` — Nom du destinataire
- `{{membership_contact.assessment_url}}` — URL d’évaluation
- `{{membership_contact.assessment_score}}` — Score d'évaluation
- `{{membership_contact.assessment_status}}` — État de l’évaluation
- `{{membership_contact.assessment_title}}` — Titre de l'évaluation
- `{{membership_contact.contact_name}}` — Nom du contact

### Shopify

- `{{order.number}}` — Nombre
- `{{order.created_on}}` — Créé le

#### Shopify › Créé le

- `{{order.customer.first_name}}` — Prénom
- `{{order.customer.last_name}}` — Nom de famille
- `{{order.customer.email}}` — E-mail
- `{{order.customer.phone}}` — Téléphone
- `{{order.total_discounts}}` — Réductions totales
- `{{order.discount_code}}` — Code de réduction
- `{{order.total_price}}` — Prix total
- `{{order.subtotal_price}}` — Sous-total
- `{{order.total_shipping_price}}` — Prix total d'expédition
- `{{order.total_cart_price}}` — Prix total du panier
- `{{order.order_status_url}}` — URL du statut de la commande
- `{{order.abandoned_checkout_url}}` — URL de paiement abandonné
- `{{order.shipping_address}}` — Adresse d'expédition
- `{{order.billing_address}}` — Adresse de facturation
- `{{order.has_discount}}` — A une réduction
- `{{order.currency_code}}` — Code de devise
- `{{order.currency}}` — Devise
- `{{order.requires_shipping}}` — Nécessite des informations d'expédition

### Gestionnaire des affiliés

- `{{affiliate.name}}` — Nom complet
- `{{affiliate.first_name}}` — Prénom
- `{{affiliate.last_name}}` — Nom de famille
- `{{affiliate.email}}` — E-mail
- `{{affiliate.campaign_name}}` — Nom de la campagne
- `{{affiliate.commission}}` — Valeur de la commission
- `{{affiliate.link}}` — Lien de l'affilié
- `{{affiliate.location_name}}` — Nom du lieu
- `{{affiliate.client_portal_url}}` — URL de l'application de portail client
- `{{affiliate.magic_link}}` — Lien de connexion magique

### Commandes

- `{{order.id}}` — ID de commande
- `{{order.source}}` — Source
- `{{order.payment_gateway}}` — Passerelle de paiement
- `{{order.created_on}}` — Créé le
- `{{order.delivery_method}}` — Mode de livraison

#### Commandes › Customer

- `{{order.customer.first_name}}` — Prénom
- `{{order.customer.last_name}}` — Nom de famille
- `{{order.customer.name}}` — Nom
- `{{order.customer.email}}` — E-mail
- `{{order.customer.phone}}` — Téléphone
- `{{order.customer.full_address}}` — Adresse complète
- `{{order.customer.city}}` — Ville
- `{{order.customer.state}}` — État
- `{{order.customer.postal_code}}` — Code postal
- `{{order.customer.country}}` — Pays

#### Commandes › Adresse de facturation

- `{{order.billing_address.full_name}}` — Nom complet
- `{{order.billing_address.address}}` — Adresse
- `{{order.billing_address.city}}` — Ville
- `{{order.billing_address.state}}` — État
- `{{order.billing_address.postal_code}}` — Code postal
- `{{order.billing_address.country}}` — Pays
- `{{order.billing_address.phone}}` — Téléphone

#### Commandes › Informations de livraison

- `{{order.delivery.name}}` — Nom
- `{{order.delivery.full_address}}` — Adresse complète
- `{{order.delivery.city}}` — Ville
- `{{order.delivery.state}}` — État
- `{{order.delivery.postal_code}}` — Code postal
- `{{order.delivery.country}}` — Pays
- `{{order.delivery.delivery_instructions}}` — Instructions de livraison
- `{{order.delivery.pickup_charges}}` — Frais de retrait
- `{{order.delivery.pickup_tax}}` — Taxe de retrait
- `{{order.delivery.pickup_total_amount}}` — Montant total du retrait
- `{{order.currency_code}}` — Code de devise
- `{{order.currency_symbol}}` — Symbole de devise
- `{{order.total_cart_price}}` — Prix total du panier
- `{{order.has_discount}}` — A une réduction
- `{{order.total_discount}}` — Réductions totales
- `{{order.discount_code}}` — Code de réduction
- `{{order.total_price}}` — Prix total
- `{{order.miscellaneous_charges}}` — facturation diverses
- `{{order.order_status_url}}` — URL du statut de la commande

### Facture


#### Facture › Entreprise

- `{{invoice.company.name}}` — Nom
- `{{invoice.company.phone}}` — Téléphone
- `{{invoice.company.address}}` — Adresse
- `{{invoice.company.city}}` — Ville
- `{{invoice.company.state}}` — État
- `{{invoice.company.country}}` — Pays
- `{{invoice.company.website}}` — Site web
- `{{invoice.company.logo}}` — Logo

#### Facture › Client

- `{{invoice.customer.name}}` — Nom
- `{{invoice.customer.first_name}}` — Prénom
- `{{invoice.customer.last_name}}` — Nom de famille
- `{{invoice.customer.phone}}` — Téléphone
- `{{invoice.customer.email}}` — E-mail
- `{{invoice.customer.company}}` — Entreprise
- `{{invoice.customer.address}}` — Adresse
- `{{invoice.customer.city}}` — Ville
- `{{invoice.customer.state}}` — État
- `{{invoice.customer.postal_code}}` — Code postal

#### Facture › Expéditeur

- `{{invoice.sender.name}}` — Nom
- `{{invoice.customer.email}}` — E-mail
- `{{invoice.name}}` — Nom
- `{{invoice.number}}` — Nombre
- `{{invoice.issue_date}}` — Date d'émission
- `{{invoice.due_date}}` — Date d'échéance
- `{{invoice.sub_total}}` — Sous-total
- `{{invoice.currency_code}}` — Currency Code
- `{{invoice.sub_total}}` — Sub Total
- `{{invoice.discount_amount}}` — Montant de la réduction
- `{{invoice.tax_amount}}` — Montant de la taxe
- `{{invoice.total_amount}}` — Montant total
- `{{invoice.title}}` — Titre
- `{{invoice.url}}` — URL

#### Facture › Informations de carte

- `{{invoice.card.brand}}` — Marque de carte
- `{{invoice.card.last4}}` — Les 4 derniers
- `{{invoice.amount_due}}` — Montant dû
- `{{invoice.amount_paid}}` — Montant payé

#### Facture › Calendrier de paiement

- `{{invoice.paymentSchedule.currentScheduleDueDate}}` — Jour dû du calendrier en cours
- `{{invoice.paymentSchedule.currentScheduleAmount}}` — Quantité du calendrier en cours
- `{{invoice.paymentSchedule.amountDue}}` — Montant dû
- `{{invoice.paymentSchedule.currentScheduleNumber}}` — Numéro de calendrier en cours

### Estimation


#### Estimation › Entreprise

- `{{estimate.company.name}}` — Nom
- `{{estimate.company.phone}}` — Téléphone
- `{{estimate.company.address}}` — Adresse
- `{{estimate.company.city}}` — Ville
- `{{estimate.company.state}}` — État
- `{{estimate.company.country}}` — Pays
- `{{estimate.company.website}}` — Site web
- `{{estimate.company.logo}}` — Logo

#### Estimation › Client

- `{{estimate.customer.name}}` — Nom
- `{{estimate.customer.first_name}}` — Prénom
- `{{estimate.customer.last_name}}` — Nom de famille
- `{{estimate.customer.phone}}` — Téléphone
- `{{estimate.customer.email}}` — E-mail
- `{{estimate.customer.address}}` — Adresse
- `{{estimate.customer.city}}` — Ville
- `{{estimate.customer.state}}` — État
- `{{estimate.customer.postal_code}}` — Code postal

#### Estimation › Expéditeur

- `{{estimate.sender.name}}` — Nom
- `{{estimate.sender.email}}` — E-mail
- `{{estimate.name}}` — Nom
- `{{estimate.number}}` — Nombre
- `{{estimate.issue_date}}` — Date d'émission
- `{{estimate.expiry_date}}` — Date d'expiration
- `{{estimate.sub_total}}` — Sous-total
- `{{estimate.currency_code}}` — Currency Code
- `{{estimate.sub_total}}` — Sub Total
- `{{estimate.discount_amount}}` — Montant de la réduction
- `{{estimate.tax_amount}}` — Montant de la taxe
- `{{estimate.total_amount}}` — Montant total
- `{{estimate.title}}` — Titre
- `{{estimate.url}}` — URL
- `{{estimate.note}}` — Remarque

### Certificats et contrats

- `{{document.name}}` — Nom
- `{{document.url}}` — URL
- `{{document.type}}` — Type
- `{{document.totalAmount}}` — Montant total
- `{{document.currencyCode}}` — Code de devise
- `{{document.currencySymbol}}` — Symbole de devise
- `{{document.expirydate}}` — Date d'expiration
- `{{document.previewUrl}}` — URL de prévisualisation
- `{{document.pdfLink}}` — URL PDF
- `{{document.declinedReasons}}` — Raisons de refus de document
- `{{document.declinedReasonBody}}` — Corps de la raison du refus du document

#### Certificats et contrats › Destinataire

- `{{document.recipient.firstName}}` — Prénom
- `{{document.recipient.lastName}}` — Nom de famille
- `{{document.recipient.email}}` — E-mail
- `{{document.recipient.phoneNumber}}` — Téléphone
- `{{document.recipient.country}}` — Pays

### Receipt


#### Receipt › Company

- `{{receipt.company.name}}` — Name
- `{{receipt.company.phone}}` — Phone
- `{{receipt.company.address}}` — Address
- `{{receipt.company.city}}` — City
- `{{receipt.company.state}}` — State
- `{{receipt.company.country}}` — Country
- `{{receipt.company.website}}` — Website
- `{{receipt.company.logo}}` — Logo

#### Receipt › Customer

- `{{receipt.customer.name}}` — Name
- `{{receipt.customer.first_name}}` — First Name
- `{{receipt.customer.last_name}}` — Last Name
- `{{receipt.customer.phone}}` — Phone
- `{{receipt.customer.email}}` — Email
- `{{receipt.customer.company}}` — Company
- `{{receipt.customer.address}}` — Address
- `{{receipt.customer.city}}` — City
- `{{receipt.customer.state}}` — State
- `{{receipt.customer.postal_code}}` — Postal code
- `{{receipt.number}}` — Number
- `{{receipt.date_paid}}` — Date Paid
- `{{receipt.currency_symbol}}` — Currency Symbol
- `{{receipt.currency_code}}` — Currency Code
- `{{receipt.sub_total}}` — Sub Total
- `{{receipt.discount_amount}}` — Discount Amount
- `{{receipt.tax_amount}}` — Tax Amount
- `{{receipt.total_amount}}` — Total Amount
- `{{receipt.title}}` — Title
- `{{receipt.url}}` — URL
- `{{receipt.miscellaneous_charges}}` — facturation diverses

### E-commerce

- `{{ecommerce.checkout_page_url}}` — URL de la page de paiement
- `{{ecommerce.product_list_page_url}}` — Page de la liste des produits

### Paiement


#### Paiement › Paiement reçu

- `{{payment.source}}` — Source
- `{{payment.currency_symbol}}` — Symbole de devise
- `{{payment.currency_code}}` — Code de devise

#### Paiement › Paiement reçu › Client

- `{{payment.customer.id}}` — ID
- `{{payment.customer.first_name}}` — Prénom
- `{{payment.customer.last_name}}` — Nom de famille
- `{{payment.customer.name}}` — Nom
- `{{payment.customer.email}}` — E-mail
- `{{payment.customer.phone}}` — Téléphone
- `{{payment.customer.address}}` — Adresse complète
- `{{payment.customer.city}}` — Ville
- `{{payment.customer.state}}` — État
- `{{payment.customer.country}}` — Pays
- `{{payment.customer.postal_code}}` — Code postal

#### Paiement › Paiement reçu › Facture

- `{{payment.invoice.name}}` — Nom
- `{{payment.invoice.number}}` — Nombre
- `{{payment.invoice.issue_date}}` — Date d'émission
- `{{payment.invoice.due_date}}` — Date d'échéance
- `{{payment.invoice.url}}` — URL
- `{{payment.invoice.recorded_by}}` — Enregistré par
- `{{payment.invoice.amount_due}}` — Montant dû
- `{{payment.invoice.amount_paid}}` — Montant payé
- `{{payment.sub_total_amount}}` — Sous-total
- `{{payment.discount_amount}}` — Montant de la réduction
- `{{payment.coupon_code}}` — Code de réduction
- `{{payment.tax_amount}}` — Montant de la taxe
- `{{payment.created_on}}` — Créé le
- `{{payment.total_amount}}` — Montant total
- `{{payment.transaction_id}}` — ID de transaction
- `{{payment.payment_status}}` — Statut
- `{{payment.gateway}}` — Passerelle
- `{{payment.card.last4}}` —  4 derniers chiffres de la carte
- `{{payment.card.brand}}` — Marque de carte
- `{{payment.method}}` — Méthode
- `{{payment.miscellaneous_charges}}` — facturation diverses

#### Paiement › Abonnement

- `{{subscription.source}}` — Source
- `{{subscription.currency_symbol}}` — Symbole de devise
- `{{subscription.currency_code}}` — Code de devise
- `{{subscription.sub_total_amount}}` — Sous-total
- `{{subscription.discount_amount}}` — Montant de la réduction
- `{{subscription.tax_amount}}` — Montant de la taxe
- `{{subscription.total_amount}}` — Montant total
- `{{subscription.created_on}}` — Créé le
- `{{subscription.coupon_code}}` — Code de réduction
- `{{subscription.id}}` — ID d'abonnement
- `{{subscription.status}}` — Statut de l'abonnement
- `{{subscription.global_product.name}}` — Nom du produit
- `{{subscription.miscellaneous_charges}}` — facturation diverses

#### Paiement › Remboursement

- `{{refund.transaction.entitySourceType}}` — Source
- `{{refund.currency_symbol}}` — Symbole de devise
- `{{refund.currency_code}}` — Code de devise
- `{{refund.transaction.id}}` — ID de transaction
- `{{refund.id}}` — ID de remboursement
- `{{refund.amount}}` — Montant du remboursement
- `{{refund.status}}` — Statut du remboursement
- `{{refund.transaction.status}}` — Type de remboursement

### Lien de paiement

- `{{paymentLink.link_name}}` — Nom du lien
- `{{paymentLink.url}}` — URL
- `{{paymentLink.account_name}}` — Nom du compte
- `{{paymentLink.sender_name}}` — Nom de l'expéditeur
- `{{paymentLink.sender_email}}` — Adresse e-mail de l'expéditeur
- `{{paymentLink.total_amount}}` — Montant total
- `{{paymentLink.total_after_trial}}` — Total après l'essai

#### Lien de paiement › Contact

- `{{paymentLink.contact.first_name}}` — Prénom
- `{{paymentLink.contact.last_name}}` — Nom de famille
- `{{paymentLink.contact.phone}}` — Téléphone
- `{{paymentLink.contact.email}}` — E-mail
- `{{paymentLink.contact.address}}` — Adresse
- `{{paymentLink.contact.city}}` — Ville
- `{{paymentLink.contact.state}}` — État
- `{{paymentLink.contact.postal_code}}` — Code postal

#### Lien de paiement › Expéditeur

- `{{paymentLink.sender.name}}` — Nom
- `{{paymentLink.sender.email}}` — E-mail

#### Lien de paiement › Produit

- `{{paymentLink.product.currency_symbol}}` — Symbole de devise
- `{{paymentLink.product.currency_code}}` — Code de devise

### Portail client


#### Portail client › Communautés


#### Portail client › Communautés › destinataire

- `{{communities_contacts.receiverName}}` — Nom du destinataire
- `{{communities_contacts.receiverGamificationLevel}}` — niveau ludification

#### Portail client › Communautés › Demandeur

- `{{communities_contacts.requestorName}}` — Nom du demande
- `{{communities_contacts.requestorEmail}}` — E-mail du demande

#### Portail client › Communautés › commentaire


#### Portail client › Communautés › commentaire › auteur

- `{{communities_comment.authorName}}` — Nom de auteur
- `{{communities_comment.authorAvatar}}` — auteur de l'analytique
- `{{communities_comment.content}}` — contenu
- `{{communities_parentComment.authorName}}` — Nom de l'auteur du commentaire parent

#### Portail client › Communautés › partager


#### Portail client › Communautés › partager › auteur

- `{{communities_post.authorName}}` — Nom de auteur
- `{{communities_post.authorAvatar}}` — auteur de l'analytique
- `{{communities_post.content}}` — contenu

#### Portail client › Communautés › Groupe

- `{{communities_group.name}}` — Nom
- `{{communities_group.logo}}` — Logo

#### Portail client › Communautés › canal

- `{{communities_channel.name}}` — Nom
- `{{communities_channel.roleUpdatedByUserName}}` — Le rôle est mis à jour via le Nom du utilisateur
- `{{communities_channel.role}}` — Rôle

#### Portail client › Communautés › événements

- `{{communities_event.title}}` — Titre
- `{{communities_event.date}}` — Date
- `{{communities_event.time}}` — Heure
- `{{communities_event.location}}` — emplacement

#### Portail client › Communautés › Paiements

- `{{communities_payments.productName}}` — Nom du produit
- `{{communities_payments.date}}` — Date
- `{{communities_payments.trialDays}}` — Jours essai
- `{{communities_payments.type}}` — saisir
- `{{communities_payments.status}}` — Statut
- `{{communities_payments.amount}}` — Montant

#### Portail client › Communautés › Cours

- `{{communities_course.productName}}` — Nom du cours
- `{{communities_course.timeAccessDays}}` — Date d'accès

#### Portail client › Cours

- `{{membership_contact.email}}` — E-mail
- `{{membership_contact.login_url}}` — URL de connexion (lien magique)
- `{{membership_contact.offer_title}}` — Titre de l'offre
- `{{membership_contact.category_url}}` — URL de la catégorie
- `{{membership_contact.product_title}}` — Titre du produit
- `{{membership_contact.category_title}}` — Titre de la catégorie
- `{{membership_contact.support_email}}` — E-mail d'assistance
- `{{membership_contact.support_phone}}` — Téléphone
- `{{membership_contact.site_name}}` — Nom du site
- `{{membership_contact.post_title}}` — titre
- `{{membership_contact.post_url}}` — URL du cours
- `{{membership_contact.product_url}}` — URL du produit
- `{{membership_contact.comment_url}}` — URL du commentaire
- `{{membership_contact.recipient_name}}` — Nom du destinataire
- `{{membership_contact.assessment_url}}` — URL d’évaluation
- `{{membership_contact.assessment_score}}` — Score d'évaluation
- `{{membership_contact.assessment_status}}` — État de l’évaluation
- `{{membership_contact.contact_name}}` — Nom du contact
- `{{membership_contact.assessment_title}}` — Titre de l'évaluation

#### Portail client › Certificats

- `{{certificate.url}}` — URL du certificat

#### Portail client › facturation

- `{{invoice.invoiceName}}` — Nom de la facture
- `{{invoice.invoiceNumber}}` — nombre
- `{{invoice.totalAmount}}` — Montant total
- `{{invoice.companyName}}` — Nom de l'
- `{{invoice.issueDate}}` — Date d'émission
- `{{invoice.dueDate}}` — Date d'échéance
- `{{invoice.senderName}}` — Nom de l’expéditeur
- `{{invoice.recipientName}}` — Nom du destinataire

#### Portail client › estimation

- `{{estimate.estimateName}}` — Nom de estimation
- `{{estimate.estimateNumber}}` — nombre d'estimations
- `{{estimate.totalAmount}}` — Montant total
- `{{estimate.companyName}}` — Nom de l'
- `{{estimate.issueDate}}` — Date d'émission
- `{{estimate.expirationDate}}` — Date d'expiration
- `{{estimate.recipientName}}` — Nom du destinataire

#### Portail client › contrat

- `{{contract.contractName}}` — Nom d'accord
- `{{contract.totalAmount}}` — Montant total
- `{{contract.issueDate}}` — Date d'émission
- `{{metadata.redirectionUrl}}` — URL de redirection
- `{{membership_contact.login_url}}` — URL de la se connecter (lien magique)

### paiement abandonné

- `{{abandoned_checkout.cartValue}}` — Valeur du Panier
- `{{abandoned_checkout.discount}}` — Réduction
- `{{abandoned_checkout.cartLink}}` — Lien du panier

### Traitement de commande

- `{{ecommerce_order_fulfilled_trigger.fulfilledOn}}` — Date de Traitement
- `{{ecommerce_order_fulfilled_trigger.globalProductIds}}` — ID des produits traités
- `{{ecommerce_order_fulfilled_trigger.fulfilledProductNames}}` — Nom(s) du produit
- `{{ecommerce_order_fulfilled_trigger.trackingNumber}}` — Numéro de suivi
- `{{ecommerce_order_fulfilled_trigger.priceName}}` — Prix
- `{{ecommerce_order_fulfilled_trigger.availableQuantity}}` — Quantité disponible
- `{{ecommerce_order_fulfilled_trigger.fulfilledQty}}` — Quantité Traitée
- `{{ecommerce_order_fulfilled_trigger.fulfilledQtyPerItem}}` — Quantité traitée (par élément)
- `{{ecommerce_order_fulfilled_trigger.fulfillmentStatus}}` — Statut de traitement
- `{{ecommerce_order_fulfilled_trigger.shippingCarrier}}` — Transporteur
- `{{ecommerce_order_fulfilled_trigger.trackingUrl}}` — URL de suivi
- `{{ecommerce_order_fulfilled_trigger.orderStatusUrl}}` — URL du statut de la commande
- `{{ecommerce_order_fulfilled_trigger.cartValue}}` — Valeur du Panier

### Examiner la soumission

- `{{leadgen_ecommerce_review_submitted.status}}` — Examiner le statut
- `{{leadgen_ecommerce_review_submitted.rating}}` — Examiner l'évaluation
- `{{leadgen_ecommerce_review_submitted.headline}}` — Titre de l'avis
- `{{leadgen_ecommerce_review_submitted.comment}}` — Examiner le commentaire
- `{{leadgen_ecommerce_review_submitted.customer.name}}` — Nom d'utilisateur

### IA conversationnelle

- `{{ai.response}}` — Réponse par IA

### Réservation de service

- `{{serviceBooking.id}}` — ID
- `{{serviceBooking.title}}` — Titre
- `{{serviceBooking.start_time}}` — Date et heure de début
- `{{serviceBooking.only_start_date}}` — Date de début
- `{{serviceBooking.only_start_time}}` — Heure de début
- `{{serviceBooking.end_time}}` — Date et heure de fin
- `{{serviceBooking.only_end_date}}` — Date de fin
- `{{serviceBooking.only_end_time}}` — Heure de fin
- `{{serviceBooking.day_of_week}}` — Jour de la semaine
- `{{serviceBooking.month}}` — Mois
- `{{serviceBooking.month_english}}` — Nom du mois
- `{{serviceBooking.timezone}}` — Fuseau horaire
- `{{serviceBooking.cancellation_link}}` — Lien d'annulation
- `{{serviceBooking.reschedule_link}}` — Lien de reprogrammation
- `{{serviceBooking.meeting_location}}` — Lieu de la réunion
- `{{serviceBooking.notes}}` — Remarques

#### Réservation de service › Services

- `{{#each serviceBooking.services}}
    {{this.name}}
{{/each}}` — Nom
- `{{#each serviceBooking.services}}
    {{this.price}}
{{/each}}` — Prix
- `{{#each serviceBooking.services}}
    {{this.duration}}
{{/each}}` — Durée
- `{{#each serviceBooking.services}}
    {{this.only_start_date}}
{{/each}}` — Date de début
- `{{#each serviceBooking.services}}
    {{this.only_start_time}}
{{/each}}` — Heure de début
- `{{#each serviceBooking.services}}
    {{this.timezone}}
{{/each}}` — Fuseau horaire

#### Réservation de service › Services › Utilisateur assigné

- `{{#each serviceBooking.services}}
    {{this.user.name}}
{{/each}}` — Nom complet
- `{{#each serviceBooking.services}}
    {{this.user.first_name}}
{{/each}}` — Prénom
- `{{#each serviceBooking.services}}
    {{this.user.last_name}}
{{/each}}` — Nom de famille
- `{{#each serviceBooking.services}}
    {{this.user.email}}
{{/each}}` — E-mail
- `{{#each serviceBooking.services}}
    {{this.user.phone}}
{{/each}}` — Téléphone
- `{{#each serviceBooking.services}}
    {{this.user.phone_raw}}
{{/each}}` — Téléphone (format brut)
- `{{#each serviceBooking.services}}
    {{this.user.email_signature}}
{{/each}}` — Signature
- `{{#each serviceBooking.services}}
    {{this.user.calendar_link}}
{{/each}}` — Lien vers le calendrier
- `{{#each serviceBooking.services}}
    {{this.user.twilio_phone_number}}
{{/each}}` — Téléphone Twilio

#### Réservation de service › Services › Module complémentaire de service

- `{{#each serviceBooking.services}}
    {{#if addOns}}
        Add-ons:
        {{#each addOns}}
            {{this.addonName}}
        {{/each}}
    {{/if}}
{{/each}}` — Nom
- `{{#each serviceBooking.services}}
    {{#if addOns}}
        Add-ons:
        {{#each addOns}}
            {{this.addonPrice}}
        {{/each}}
    {{/if}}
{{/each}}` — Prix
- `{{#each serviceBooking.services}}
    {{#if addOns}}
        Add-ons:
        {{#each addOns}}
            {{this.addonDuration}}
        {{/each}}
    {{/if}}
{{/each}}` — Durée
- `{{#each serviceBooking.services}}
    {{#if addOns}}
        Add-ons:
        {{#each addOns}}
            {{this.addonQuantity}}
        {{/each}}
    {{/if}}
{{/each}}` — Quantité

### Réservation de location

- `{{rentalBooking.id}}` — ID
- `{{rentalBooking.title}}` — Titre
- `{{rentalBooking.business_name}}` — Nom de l'entreprise de location
- `{{rentalBooking.start_time}}` — Date et heure de début
- `{{rentalBooking.only_start_date}}` — Date de début
- `{{rentalBooking.only_start_time}}` — Heure de début
- `{{rentalBooking.end_time}}` — Date et heure de fin
- `{{rentalBooking.only_end_date}}` — Date de fin
- `{{rentalBooking.only_end_time}}` — Heure de fin
- `{{rentalBooking.day_of_week}}` — Jour de la semaine
- `{{rentalBooking.month_name}}` — Nom du mois
- `{{rentalBooking.timezone}}` — Fuseau horaire
- `{{rentalBooking.location}}` — emplacement
- `{{rentalBooking.status}}` — Statut de la réservation
- `{{rentalBooking.total_price}}` — Montant total
- `{{rentalBooking.amount_paid}}` — Montant payé
- `{{rentalBooking.amount_due}}` — Montant dû
- `{{rentalBooking.security_deposit}}` — Dépôt de garantie
- `{{rentalBooking.booking_payment_status}}` — Statut du paiement
- `{{rentalBooking.notes}}` — Remarques

#### Réservation de location › Annonces

- `{{#each rentalBooking.listings}}
    {{this.name}}
{{/each}}` — Nom
- `{{#each rentalBooking.listings}}
    {{this.quantity}}
{{/each}}` — Quantité
- `{{#each rentalBooking.listings}}
    {{this.price}}
{{/each}}` — Prix
- `{{#each rentalBooking.listings}}
    {{this.start_time}}
{{/each}}` — Date et heure de début
- `{{#each rentalBooking.listings}}
    {{this.only_start_date}}
{{/each}}` — Date de début
- `{{#each rentalBooking.listings}}
    {{this.end_time}}
{{/each}}` — Date et heure de fin
- `{{#each rentalBooking.listings}}
    {{this.only_end_date}}
{{/each}}` — Date de fin
- `{{#each rentalBooking.listings}}
    {{this.timezone}}
{{/each}}` — Fuseau horaire
- `{{#each rentalBooking.listings}}
    {{this.status}}
{{/each}}` — Statut

### système Gmail

- `{{system_emails.email_logo_url}}` — Erreur URLdu logo d'e-mail
- `{{system_emails.cta_color}}` — couleur CTA

#### système Gmail › E-mail de bienvenue


#### système Gmail › E-mail de bienvenue › Utilisateur

- `{{user.first_name}}` — Prénom
- `{{user.last_name}}` — Nom de famille
- `{{user.email}}` — E-mail
- `{{user.password}}` — Mot de passe
- `{{user.passwordUrl}}` — URL du mot de passe
- `{{user.id}}` — Id de l'utilisateur
- `{{user.name}}` — Nom
- `{{user.locations}}` — Adresse

#### système Gmail › E-mail de bienvenue › Droit d'auteur

- `{{right_now.year}}` — Année

#### système Gmail › E-mail de bienvenue › Agence

- `{{agency.logo}}` — Logo
- `{{agency.url}}` — URL
- `{{agency.name}}` — Nom
- `{{agency.email}}` — E-mail
- `{{agency.address}}` — Adresse
- `{{agency.unsubscribeLink}}` — Lien de désinscription

#### système Gmail › Réinitialiser le mot de passe

- `{{user.first_name}}` — Prénom
- `{{user.verification_link}}` — Lien de vérification

#### système Gmail › Code de vérification

- `{{agency.logo}}` — Logo de l'agence
- `{{agency.url}}` — URL de l'agence
- `{{agency.name}}` — Nom de l'agence
- `{{agency.email}}` — E-mail de l'agence
- `{{agency.address}}` — Adresse de l'agence
- `{{agency.unsubscribe_link}}` — Lien de désinscription
- `{{right_now.year}}` — Année en cours
- `{{user.email}}` — Adresse e-mail de l'utilisateur
- `{{user.first_name}}` — Prénom de l'utilisateur
- `{{user.last_name}}` — Nom de famille de l'utilisateur
- `{{user.name}}` — Nom d'utilisateur
- `{{user.id}}` — Id de l'utilisateur
- `{{user.otp}}` — Mot de passe à usage unique de l'utilisateur
- `{{user.locations}}` — Adresse des utilisateurs
- `Custom Values` — Valeurs personnalisées

## Menu : Liens de déclenchement
